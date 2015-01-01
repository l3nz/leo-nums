    var gridster;

    var WIDTH = 6;
    var ELEMS = 20;

    $(function(){

      gridster = $(".gridster > ul").gridster({
          widget_margins: [5, 5],
          widget_base_dimensions: [70, 70],
          max_cols: WIDTH,
          min_cols: WIDTH,
          max_rows: WIDTH,
          min_rows: WIDTH,
          serialize_params: function($w, wgd) { 
            return { col: wgd.col, row: wgd.row, size_x: wgd.size_x, size_y: wgd.size_y, 
              id: $w.attr('id') * 1, 
              pos: (wgd.col-1) + (wgd.row-1)*WIDTH } 
          },
          draggable: {
            stop: function(e, ui, $widget) {
              updateState();
            }
          }
      }).data('gridster');
    });

    function addLog( s ) {
      log.innerHTML = s + "<br >" + log.innerHTML;
    }

    function seqOk( ) {
        return isSeqOk( gridster.serialize()) ;
    }

    /**
    * Check whether a sequence is okay.
    */
    function isSeqOk( arSeq ) {
        var boOK = true;
        for (var i = 0; i < arSeq.length; i++) {
          // addLog( "S:" + i + " pos " + arSeq[i].pos + " id " + arSeq[i].id );
        

          if ( arSeq[i].pos != arSeq[i].id ) {
            boOK = false;
          }
        }
        return boOK;
    }




    function updateState() {

      nMosse +=1;
      

      $("#n_mosse").html( ""+ nMosse);
      $("#tempo").html( (now() - tempoIniziale) + " s." );
      
      if ( seqOk() ) {
        $("#state").html( "BRAVO LEO ");
        alert( "BRAVO!!!!" );
      } 
    }

    function shuffle(o){ //v1.0
      for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
    };

    function now() {
      var d = new Date();
      return Math.floor( d.getTime() / 1000);
    }

var nMosse = 0;
var tempoIniziale = 0;

function startGame() {

  nMosse = 0;
  tempoIniziale = now();

  $("#n_mosse").html( "0" );
  $("#state").html( "" );
  $("#tempo").html( "" );

  gridster.remove_all_widgets();

      elems = [];
      for ( i = 0; i < ELEMS; i++ ) {
        elems[elems.length]=i;
      }

      shuffle(elems);

      for ( j = 0; j < elems.length; j++ ) {
        var i = elems[j];
        widget = ["<li id='" + i + "' class='item'>" +  (i+1) +"</li>", 1, 1];
        gridster.add_widget.apply(gridster, widget);
      }
  }
