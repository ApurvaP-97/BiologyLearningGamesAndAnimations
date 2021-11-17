$(document).ready(function () {
    var move_to = function( $obj, $target) {
        $parent = $obj.parent();
        $parent.detach($obj);
        $target.append($obj);
        update($parent);
        update($target);
    }

    var update = function($con) {
        if ($con.hasClass("dropBox")) {
            $children = $con.children();
            if ($children.length == 0) {
                $con.text($con.attr("id"));
            }

            if ($children.hasClass("answer")) {
                $con.addClass("has-answer");
                $con.contents().each(function() {
                    if (!$(this).hasClass("answer")) {
                        $(this).remove();
                    }
                });
            } else {
                $con.removeClass("has-answer");
            }
        } else if ($con.hasClass("word-bank")) {
        }
    }

    $(".answer").draggable({
        revert: "invalid",
        revertDuration: 0,
        stop:function(ev, ui) {
            $q = $(this);
            $q.css("top", "");
            $q.css("left", "");
        },

        zIndex: 1
    });

    $(".dropBox").droppable({
        accept: ".answer",
        tolerance: "pointer",
        addClasses: false,
        classes: {
            "ui-droppable-hover": "answer-hover"
        },

        drop: function(event, ui) {
            var $q = $(this);
            $ans = ui.draggable;

            $q.removeClass('incorrect');

            if ($q.hasClass("has-answer")) {
                move_to($q.children(), $(".word-bank"));
            }

            move_to($ans, $q);
        },

        out: function(event, ui) {
            $q = $(this);
            $q.removeClass('correct');
            $q.removeClass('incorrect');
        }
    });

    $(".dropBox").dblclick(function() {
        $q = $(this)
        if ($q.hasClass("has-answer")) {
            move_to($q.children(), $(".word-bank"));
            $q.removeClass('correct');
            $q.removeClass('incorrect');
        }
    });

    $("#submit").click(function() {
        var numCorrect = 0;
        $('.dropBox').each(function() {
            $q = $(this);
            if ($q.attr("id") == "#" + $q.children().attr("id")) {
                numCorrect += 1;
                $q.addClass('correct');
                $q.children().draggable('disable');
                $q.droppable('disable');
                $q.off('dblclick');
            } else {
                if ($q.hasClass("has-answer")) {
                    $q.addClass('incorrect');
                }

                $q.children().draggable('enable');
                $q.droppable('enable');
            }
        });

        $('#result').text(`You answered ${numCorrect}/11 questions correctly!`);

        window.setTimeout(function() {
            $('#result').text('');
        }, 2500)
    });


    $("#hint").click(function() {
        // var numCorrect = 0;
        // var initialState = $(window).clone();

        var colors = [
            "#000000", // 0. black
            "#800000", // 1. maroon
            "#9A6324", // 2. brown
            "#808000", // 3. olive
            "#000075", // 4. navy
            "#911eb4", // 5. purple
            "#f7347a", // 6. pink
            "#047806", // 7. green
            "#777777", // 8. gray
            "#133337", // 9. some blue-green
            "#336EFF", // 10. blue
            "#AD7D00", // 11. yellow-brown
        ]
        $('.dropBox').each(function() {
            $q = $(this);
            if ($q.attr("id") == "#" + $q.children().attr("id")) {
                // numCorrect += 1;
                $q.addClass('correct');
                $q.children().draggable('disable');
                $q.droppable('disable');
                $q.off('dblclick');
            } else {
                if ($q.hasClass("has-answer")) {
                    index = $q.attr("id").substring(1);
                    color = colors[parseInt((index))];
                    // console.log(index);

                    // $q.addClass('incorrect');
                    $q.css("background-color", color);
                    // $q.css("color", color);
                    $("#"+ index).css("color", color);
                }

                $q.children().draggable('enable');
                $q.droppable('enable');
            }
        });

        // $('#result').text(`You answered ${numCorrect}/11 questions correctly!`);

        // setTimeout(function() {
        //     $(document).replaceWith(initialState);
        // }, 2500);
    });

});
