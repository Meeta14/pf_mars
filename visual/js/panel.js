/**
 * The control panel.
 */
var Panel = {
    init: function() {
        var $algo = $('#algorithm_panel');

        $('.panel').draggable();
        $('.accordion').accordion({
            collapsible: false,
        });
        $('.option_label').click(function() {
            $(this).prev().click();
        });
        $('#hide_instructions').click(function() {
            $('#instructions_panel').slideUp();
        });
        $('#play_panel').css({
            top: $algo.offset().top + $algo.outerHeight() + 20
        });
        $('#button2').attr('disabled', 'disabled');
        $('#button4').attr('enabled', 'disabled');
        $('#button5').attr('enabled', 'disabled');
        $('#button6').attr('enabled', 'disabled');
        // $('#block_panel').css({
        //     top: $algo.offset().top + $algo.outerHeight() + 100
        // });
        // $('#button2').attr('disabled', 'disabled');
    },

    getFinder: function() {
        var finder, selected_header, distance, allowDiagonal;//, biDirectional, dontCrossCorners, weight, trackRecursion, timeLimit;

        selected_header = $(
            '#algorithm_panel ' +
            '.ui-accordion-header[aria-selected=true]'
        ).attr('id');

        switch (selected_header) {

        case 'astar_header':
            allowDiagonal = typeof $('#astar_section ' +
                                     '.allow_diagonal:checked').val() !== 'undefined';
            distance = $('input[name=astar_heuristic]:checked').val();
                finder = new PF.AstarSearch({
                    distance: PF.Distance[distance]
                });
            break;

        case 'breadthfirst_header':
            allowDiagonal = typeof $('#breadthfirst_section ' +
                                     '.allow_diagonal:checked').val() !== 'undefined';
                finder = new PF.BreadthFirstSearch({
                    allowDiagonal: allowDiagonal
                });
            break;

        case 'bestfirst_header':
            allowDiagonal = typeof $('#bestfirst_section ' +
                                     '.allow_diagonal:checked').val() !== 'undefined';
            heuristic = $('input[name=bestfirst_heuristic]:checked').val();
                finder = new PF.BestFirstSearch({
                    allowDiagonal: allowDiagonal,
                    dontCrossCorners: dontCrossCorners,
                    heuristic: PF.Heuristic[heuristic]
                });
            break;

        case 'dijkstra_header':
            allowDiagonal = typeof $('#dijkstra_section ' +
                                     '.allow_diagonal:checked').val() !== 'undefined';
                finder = new PF.DijkstraFinder({
                    allowDiagonal: allowDiagonal
                });
            break;
        }

        return finder;
    }
};
