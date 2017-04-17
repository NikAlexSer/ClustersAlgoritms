var pointCount = 50;



function init() {
    var canvas = document.getElementById("kmeans");
    if (!canvas.getContext) return;
    var ctx = canvas.getContext('2d');

    ctx.canvas.width = 700;
    ctx.canvas.height = 700;


    var data = [];
    var centroids = [];
    var colors = ['red', 'green', 'blue', 'purple'];

    var rand = function(min, max) {
        return min + (max - min) * Math.random();
    };

    var prepareData = function() {
        var cts = [
            {
                x: 400,
                y: 200
            },
            {
                x: 200,
                y: 400
            }
        ];

        for(var i = 0; i < cts.length; i++) {
            var c = cts[i];

            for(var j = 0; j < pointCount; j++) {
                var x = c.x + rand(-200, 200);
                var y = c.y + rand(-200, 200);
                var o = {
                    x: x,
                    y: y,
                    id: -1
                };
                data.push(o);

                ctx.beginPath();
                ctx.arc(o.x, o.y, 10, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    };

    var init = function() {
        prepareData();

        var arr = data.sort(function(a, b) {
            return Math.random() * 2 - 1;
        });

        var n = 3;
        for(var i = 0; i < n; i++) {
            centroids[i] = {
                x: arr[i].x,
                y: arr[i].y
            };
        }

        for(var i = 0; i < centroids.length; i++) {
            var c = centroids[i];
            ctx.beginPath();
            ctx.arc(c.x, c.y, 10, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fill();
        }
    };

    var assignCentroid = function() {
        for(var i = 0; i < data.length; i++) {
            var p = data[i];
            min_d = Number.POSITIVE_INFINITY;
            for(var j = 0; j < centroids.length; j++) {
                var c = centroids[j];
                var dx = p.x - c.x;
                var dy = p.y - c.y;
                var d = Math.sqrt(dx*dx + dy*dy);
                if(d < min_d) {
                    p.id = j;
                    min_d = d;
                }
            }
            ctx.fillStyle = colors[p.id];
            ctx.beginPath();
            ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
            ctx.fill();
        }
    };

    var meanMove = function() {
        for(var i = 0; i < centroids.length; i++) {
            var c = centroids[i];
            var sum_x = 0, sum_y = 0;
            var count = 0;
            for(var j = 0; j < data.length; j++) {
                var p = data[j];
                if(p.id === i) {
                    sum_x += p.x;
                    sum_y += p.y;
                    count++;
                }
            }
            c.x = sum_x / count;
            c.y = sum_y / count;
            ctx.beginPath();
            ctx.arc(c.x, c.y, 10, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 0, 0.5)';
            ctx.fill();
        }
    };

    var calcKMeans = function(n) {
        for(var i = 0; i < n; i++) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            assignCentroid();
            meanMove();
        }
    };

    init();
    calcKMeans(40);
}




$(document).ready(function () {
    init();
});