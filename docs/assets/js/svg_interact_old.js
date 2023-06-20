var svg = document.getElementById('map-svg');
var input = document.getElementById('map-scale');

// input.addEventListener('input', zoom_scalar(this.value));

// function makeDraggable(evt){
//   var svg = evt.target;
//   svg.addEventListener('mousedown', startDrag);
//   svg.addEventListener('mousemove', drag);
//   svg.addEventListener('mouseup', endDrag);
//   svg.addEventListener('mouseleave', endDrag);

//   function startDrag(evt){
//     if(evt.target.classList.contains('draggable')){
//       selectedElement = evt.target;
//     }
//   }

//   function drag(evt){
//     if (selectedElement) {
//       evt.preventDefault();
//       var x = parseFloat(selectedElement.getAttributeNS(null, "x"));
//       selectedElement.setAttributeNS(null, "x", x + 0.1);
//     }
//   }

//   function endDrag(evt){
//     selectedElement = null;
//   }
// }


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

        // Make sure the first transform on the element is a translate transform
        var transforms = selectedElement.transform.baseVal;

        if (transforms.length === 0 || transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
          // Create an transform that translates by (0, 0)
          var translate = svg.createSVGTransform();
          translate.setTranslate(0, 0);
          selectedElement.transform.baseVal.insertItemBefore(translate, 0);
        }

        // Get initial translation
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
function zoom_scalar(scale){
    var scale_number = parseFloat(scale);
    var newScale = "scale(" + scale_number + ")";
    matrixGroup.setAttributeNS(null, "transform", newScale);
    var sub1 = document.getElementsByClassName('substructure');
    // if(scale<1.2){
    //     for(i=0;i<sub1.length;i++){
    //       sub1[i].style.opacity = '0';
    //        }
    //   }
    // else if(scale>=1.2){
    //     for(i=0;i<sub1.length;i++){
    //        sub1[i].style.opacity = '.5';
    //     }
    // }
    // else{
    //   for(i=0;i<sub1.length;i++){
    //      sub1[i].style.opacity = '.8';
    //     }
    // }
}
// from https://codepen.io/Mamboleoo/pen/WzqmoY

// if (window.PointerEvent) {
//   svg.addEventListener('pointerdown', onPointerDown);
//   svg.addEventListener('pointerup', onPointerUp); 
//   svg.addEventListener('pointerleave', onPointerUp); 
//   svg.addEventListener('pointermove', onPointerMove); 
// } 
// else {
//   svg.addEventListener('mousedown', onPointerDown);
//   svg.addEventListener('mouseup', onPointerUp);
//   svg.addEventListener('mouseleave', onPointerUp);
//   svg.addEventListener('mousemove', onPointerMove);

//   svg.addEventListener('touchstart', onPointerDown); 
//   svg.addEventListener('touchend', onPointerUp);
//   svg.addEventListener('touchmove', onPointerMove);
// }
// var point = svg.createSVGPoint();

// function getPointFromEvent (event) {
//     console.log("gets point from event");
//   if (event.targetTouches) {
//     point.x = event.targetTouches[0].clientX;
//     point.y = event.targetTouches[0].clientY;
//   } 
//   else {
//     point.x = event.clientX;
//     point.y = event.clientY;
//   }
//   var invertedSVGMatrix = svg.getScreenCTM().inverse();
// return point.matrixTransform(invertedSVGMatrix);
// }

                     
// var isPointerDown = false;
// var pointerOrigin;

                     
// function onPointerDown(event) {
//    isPointerDown = true;
//    pointerOrigin = getPointFromEvent(event);
// }
// var viewBox = svg.viewBox.baseVal;
                     
// function onPointerMove (event) {
//     console.log("moves svg");
//   if (!isPointerDown) {
//     return;
//   }
//   event.preventDefault();
//   var pointerPosition = getPointFromEvent(event);
//   viewBox.x -= (pointerPosition.x - pointerOrigin.x);
//   viewBox.y -= (pointerPosition.y - pointerOrigin.y);
// }

// function onPointerUp() {
//   isPointerDown = false;
// }
