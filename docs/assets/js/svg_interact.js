var transformMatrix = [1, 0, 0, 1, 0, 0];
var svg = document.getElementById('map_svg');
var viewbox = svg.getAttribute("viewBox").split(" ");
var centerX = parseFloat(viewbox[2]) / 2;
var centerY = parseFloat(viewbox[3]) / 2;
var matrixGroup = svg.getElementById("map-transform");

function zoom_scalar(scale){
    for (var i = 0; i < 4; i++) {
            transformMatrix[i] *= scale;
    }
    transformMatrix[4] += (1 - scale) * centerX;
    transformMatrix[5] += (1 - scale) * centerY;
                            
    var newMatrix = "matrix(" +  transformMatrix.join(' ') + ")";
    matrixGroup.setAttributeNS(null, "transform", newMatrix);
}
function pan(dx, dy) {     	
    transformMatrix[4] += dx;
    transformMatrix[5] += dy;
                
    var newMatrix = "matrix(" +  transformMatrix.join(' ') + ")";
    matrixGroup.setAttributeNS(null, "transform", newMatrix);
}

function makeDraggable(evt) {
    var svg = evt.target;

    svg.addEventListener('mousedown', startDrag);
    svg.addEventListener('mousemove', drag);
    svg.addEventListener('mouseup', endDrag);
    svg.addEventListener('mouseleave', endDrag);
    svg.addEventListener('touchstart', startDrag);
    svg.addEventListener('touchmove', drag);
    svg.addEventListener('touchend', endDrag);
    svg.addEventListener('touchleave', endDrag);
    svg.addEventListener('touchcancel', endDrag);

    var selectedElement, offset, transform,
    bbox, minX, maxX, minY, maxY, confined;

    var boundaryX1 = 10.5;
    var boundaryX2 = 30;
    var boundaryY1 = 2.2;
    var boundaryY2 = 19.2;

    function getMousePosition(evt) {
            var CTM = svg.getScreenCTM();
            if (evt.touches) { evt = evt.touches[0]; }
                    return {
                    x: (evt.clientX - CTM.e) / CTM.a,
                    y: (evt.clientY - CTM.f) / CTM.d
            };
    }

    function startDrag(evt) {
            if (evt.target.classList.contains('draggable')) {
                    selectedElement = evt.target;
                    offset = getMousePosition(evt);

                    
                    var transforms = selectedElement.transform.baseVal;

                    if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
                            var translate = svg.createSVGTransform();
                            translate.setTranslate(0, 0);
                            selectedElement.transform.baseVal.insertItemBefore(translate, 0);
                    }


                    transform = transforms.getItem(0);
                    offset.x -= transform.matrix.e;
                    offset.y -= transform.matrix.f;

                    confined = evt.target.classList.contains('confine');
                    if (confined) {
                            bbox = selectedElement.getBBox();
                            minX = boundaryX1 - bbox.x;
                            maxX = boundaryX2 - bbox.x - bbox.width;
                            minY = boundaryY1 - bbox.y;
                            maxY = boundaryY2 - bbox.y - bbox.height;
                    }
            }
    }

    function drag(evt) {
            if (selectedElement) {
                    evt.preventDefault();

                    var coord = getMousePosition(evt);
                    var dx = coord.x - offset.x;
                    var dy = coord.y - offset.y;

                    if (confined) {
                            if (dx < minX) { dx = minX; }
                            else if (dx > maxX) { dx = maxX; }
                            if (dy < minY) { dy = minY; }
                            else if (dy > maxY) { dy = maxY; }
                    }

                    transform.setTranslate(dx, dy);
            }
    }

    function endDrag(evt) {
            selectedElement = false;
    }
}