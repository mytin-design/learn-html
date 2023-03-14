var svgContext = document.getElementById('svgcontext');
var rect = svgContext.getBoundingClientRect(); //helper to enclose mouse coordinates into svg


var pagexEl = document.getElementById('pagex');
var pageyEl = document.getElementById('pagey');
var mEl = document.getElementById('mvalue');
var rxEl = document.getElementById('rx');
var ryEl = document.getElementById('ry');
var rotEl = document.getElementById('rot');
var lafEl = document.getElementById('laf');
var sfEl = document.getElementById('sf');
var axEl = document.getElementById('ax');
var ayEl = document.getElementById('ay');
var bxEl = document.getElementById('bxvalue');
var byEl = document.getElementById('byvalue');
var baEl = document.getElementById('bavalue');
var bbEl = document.getElementById('bbvalue');
var circle1 = document.getElementById('circle1');
var circle2 = document.getElementById('circle2');
var line = document.getElementById('line');
var line0 = document.getElementById('line0');
var line2 = document.getElementById('line2');
var cwEl = document.getElementById('cwvalue');
var arcCmdEl = document.getElementById('arcvalue');
var arcEl = document.getElementById('arc');
var arc2El = document.getElementById('arc2');
var arc3El = document.getElementById('arc3');
var arc4El = document.getElementById('arc4');

function updatePaths(pageX, pageY) {
    pagexEl.textContent = pageX;
    pageyEl.textContent = pageY;

    cwEl.textContent = pageY

    // line between two points 

    line.setAttribute("x1", circle1.getAttribute('cx'));
    line.setAttribute("y1", circle1.getAttribute('cy'));
    line.setAttribute("x2", circle2.getAttribute('cx'));
    line.setAttribute("y2", circle2.getAttribute('cy'));

    axEl.textContent = circle1.getAttribute('cy');
    ayEl.textContent = circle1.getAttribute('cy');
    bxEl.textContent = circle2.getAttribute('cx');
    byEl.textContent = circle2.getAttribute('cy');


    // y = mx + b
var m, b, run; // m = rise/run = (y2=y1) / (x2-x1)
if (circle1.getAttribute('cx') <= circle2.getAttribute('cx')) {
    run = (circle2.getAttribute('cx') - circle1.getAttribute('cx'));
    if (0 !== run) {
        m = (circle2.getAttribute('cy') - circle1.getAttribute('cy')) /  run;
    }
}

else {
    run = circle1.getAttribute('cx') - circle2.getAttribute('cx'); 
    if (0 !== run ) {
        m = (circle1.getAttribute('cy') - circle2.getAttribute('cy')) / run;
    }
}

if (0 !== run ) {
    //b = y - mx

    b = circle1.getAttribute('cy') - m * circle1.getAttribute('cx');
    b2 = circle2.getAttribute('cy') - m * circle2.getAttribute('cy') / run;
    baEl.textContent = b;
    bbEl = textContent = b2;
    mEl = textContent = m;

    //draw segment from the left vertical axis (x=0) to the left most point  
    //y = mx + b 

    var y = m * rect.width + b;
    line2.setAttribute("x1", rightMost.getAttribute('cx'));
    line2.setAttribute("y1", rightMost.getAttribute('cy'));
    line.setAttribute("x2", rect.width);
    line2.setAttribute("y2", y);

    //now update the other helper arcs

    var combo = [ [true, true], [true, false], [false, true], [false,false],].filter(function(item) {
        if (item[0] === lafEl.checked && item[1] === sfEl.checked) {
            return false;
        }
        return true;
    });
    arc2El.setAttribute('d', getArcCommand(leftMost, rightMost, combo[0][0], combo[0][0]));
    arc3El.setAttribute('d', getAttribute(leftMost, rightMost, combo[1][0], combo[1][1]));
    arc4El.setAttribute('d', getArcCommand(leftMost, rightMost, combo[2][0], combo[2][1]));
}
}

function getArcCommand(leftMost, rightMost, lafChecked, sfChecked) {
    return "M" + leftMost.getAttribute('cx') + " " + leftMost.getAttribute('cy') 
                + "A" + rxEl.value + " " + ryEl.value + " " + rotEl.value + " "
                + (true === lafChecked ? "1" : "0") + " " + (true === sfChecked ? "1" : "0")
                + " " + rightMost.getAttribute('cx') + " " + rightMost.getAttribute('cy');
}

function updateScreen() {
    rect = svgContext.getBoundingClientRect();
    cwEl.textContent = rect.width;
}


circle1.sdrag(function (el, pageX, startX, pageY, startY) {
    pageX -= rect.left;
    pageY -= rect.top;

    el.setAttribute('cx', pageX);
    el.setAttribute('cy', pageY);
    updatePaths(pageX, pageY);
});

circle2.sdrag(function (el, pageX, startX, pageY, startY) {
    pageX -= rect.left;
    pageY -= rect.top;

    el.setAttribute('cx', pageX);
    el.setAttribute('cy', pageY);
    updatePaths(pageX, pageY);
});

window.addEventListener('resize', updateScreen);

//sliders

['rx', 'ry', 'rot'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', function (e) {
        updatePaths();
    });
});

//checkboxes 
['laf', 'sf'].forEach(function (id) {
    document.getElementById(id).addEventListener('change', function (e) {
        updatePaths();
    });
});

updadatePaths();
updateScreen();



