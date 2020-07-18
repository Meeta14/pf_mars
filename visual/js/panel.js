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
            $('#NoOfDest').css({
                top: 20
            });
        });
        $('#play_panel').css({
            top: $algo.offset().top + $algo.outerHeight() + 20
        });
        $('#landscape_panel').css({
            top: $('#instructions_panel').offset().top + $('#instructions_panel').outerHeight() + 20
        });
        $('#button2').attr('disabled', 'disabled');

    },



    getFinder: function() {
        var finder, selected_header, distance, allowDiagonal, diagonal, dontCrossCorners;//, biDirectional, dontCrossCorners, weight, trackRecursion, timeLimit;

        selected_header = $(
            '#algorithm_panel ' +
            '.ui-accordion-header[aria-selected=true]'
        ).attr('id');

        switch (selected_header) {

        case 'astar_header':
            allowDiagonal = typeof $('#astar_section ' +
                                     '.allow_diagonal:checked').val() !== 'undefined';
            biDirectional = typeof $('#astar_section ' +
                                    '.bi-directional:checked').val() !=='undefined';
            distance = $('input[name=astar_heuristic]:checked').val();
            dontCrossCorners = typeof $('#astar_section ' +
                                     '.dont_cross_corners:checked').val() !=='undefined';
            if (biDirectional) {
                finder = new PF.BiAstarSearch({
                    htype: PF.Distance[distance],
                    diagonal: allowDiagonal,
                    dontCrossCorners: dontCrossCorners
                });
            } else {
                finder = new PF.AstarSearch({
                    htype: PF.Distance[distance],
                    diagonal: allowDiagonal,
                    dontCrossCorners: dontCrossCorners
                });
            }
            break;

        case 'breadthfirst_header':
            allowDiagonal = typeof $('#breadthfirst_section ' +
                                     '.allow_diagonal:checked').val() !== 'undefined';
            biDirectional = typeof $('#breadthfirst_section ' +
                                      '.bi-directional:checked').val() !== 'undefined';
           dontCrossCorners = typeof $('#breadthfirst_section ' +
                                   '.dont_cross_corners:checked').val() !=='undefined';
              if (biDirectional) {
                  finder = new PF.BiBreadthFS({
                      diagonal: allowDiagonal,
                      dontCrossCorners: dontCrossCorners
                  });
              } else {
                  finder = new PF.BreadthFS({
                      diagonal: allowDiagonal,
                      dontCrossCorners: dontCrossCorners
              });
          }
              break;

        case 'bestfirst_header':
            allowDiagonal = typeof $('#bestfirst_section ' +
                                     '.allow_diagonal:checked').val() !== 'undefined';
             biDirectional = typeof $('#bestfirst_section ' +
                          '.bi-directional:checked').val() !== 'undefined';
            distance = $('input[name=bestfirst_heuristic]:checked').val();
            dontCrossCorners = typeof $('#bestfirst_section ' +
                                     '.dont_cross_corners:checked').val() !=='undefined';

            weight = parseInt($('#bestfirst .spinner').val()) || 1000;
            weight = weight >= 1 ? weight : 1; /* if negative or 0, use 1 */

            if (biDirectional) {
                finder = new PF.BiAstarSearch({
                    htype : PF.Distance[distance],
                    diagonal: allowDiagonal,
                    weight: weight,
                    dontCrossCorners: dontCrossCorners
                });
            } else {
                finder = new PF.AstarSearch({
                    htype : PF.Distance[distance],
                    diagonal: allowDiagonal,
                    weight: weight,
                    dontCrossCorners: dontCrossCorners
                });
            }
            break;
        case 'dijkstra_header':
            allowDiagonal = typeof $('#dijkstra_section ' +
                                     '.allow_diagonal:checked').val() !== 'undefined';
             biDirectional = typeof $('#dijkstra_section ' +
                                      '.bi-directional:checked').val() !== 'undefined';
          dontCrossCorners = typeof $('#dijkstra_section ' +
                                   '.dont_cross_corners:checked').val() !=='undefined';
              if (biDirectional) {
                  finder = new PF.DijkstraBi({
                      diagonal: allowDiagonal,
                      dontCrossCorners: dontCrossCorners
                  });
              } else {
                  finder = new PF.Dijkstra({
                      diagonal: allowDiagonal,
                      dontCrossCorners: dontCrossCorners
                  });
              }
              break;
        }

        return finder;
    },
      getnumdest: function(){
        var selected_dest =$('input[name=dest]:checked').val();
        return selected_dest;
    },




};
