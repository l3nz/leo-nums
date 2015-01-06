    var gridster;

    var WIDTH = 6;
    var ELEMS = 4;

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


      var html = "";
      for ( var i =0; i < BRAIN.length; i++ ) {
        html += "<img src='" + BRAIN[i].icon +"' width='30px'>";
        html += "<a href='javascript:startGame(" + i + ")'>" + BRAIN[i].exercise + "</a><br>";
      }
      $( "#esercizi" ).html( html );



    });

    function addLog( s ) {

      if ( this.buster ) {
        buster.log( s );
      } else {
        log.innerHTML = s + "<br >" + log.innerHTML;
      }
    }

    function seqOk( ) {
        return isSeqOk( gridster.serialize()) ;
    }

    /**
    * Check whether a sequence is okay.
    */
    function isSeqOk( arSeq ) {

      addLog( JSON.stringify(arSeq) );

      arSeq.sort(function(a,b) { return (a.pos) - (b.pos) } );

      var l = arSeq.length;
      if ( l > 1) {
        for (var i = 1; i < l; i++) {
          var posIncr = (arSeq[i].pos > arSeq[i-1].pos);
          var idIncr  = ( arSeq[i].id > arSeq[i-1].id );
          //buster.log( "Pos" + i + " PI:" + posIncr + " ID:" + idIncr);
          if ( !( posIncr && idIncr) ) {
            return false;
          }
        }
      }
      return true;
    }

    function updateState() {

      nMosse +=1;
      

      $("#n_mosse").html( ""+ nMosse);
      $("#tempo").html( (now() - tempoIniziale) + " s." );
      
      if ( seqOk() ) {
        jump( "modal-text" );
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

    function jump(h) {
      var url = location.href;              
      location.href = "#" + h;                
      history.replaceState(null,null,url);
    }


var nMosse = 0;
var tempoIniziale = 0;

function startGame( num ) {

  nMosse = 0;
  tempoIniziale = now();
  var brain = BRAIN[num];

  $("#n_mosse").html( "0" );
  $("#state").html( "<img src='" + brain.icon + "' height='80px'>" );
  $("#tempo").html( "" );
  $("#gioco").html( brain.exercise );


  gridster.remove_all_widgets();

  var elems = makeSeq( brain );

  for ( j = 0; j < elems.length; j++ ) {
    var i = elems[j];
    var blocks = Math.floor(i.lbl.length / 3) + 1;
    widget = ["<li id='" + i.pos + "' class='item'>" +  i.lbl +"</li>", blocks, 1];
    gridster.add_widget.apply(gridster, widget);
  }
}

/**
 * 
**/

function makeSeq( brain ) {
  var seq = [];

  if ( brain.numeric ) {
    seq = makeSeqNum( brain.min_num, brain.max_num, brain.n_items );
  } else {
    seq = makeSeqText( brain.text );
  }

  return seq;

}

function makeSeqNum( min, max, num ) {

  var seq = [];
  for ( i = 0; i < max-min+1; i++ ) {
    seq[i]= { pos: i, lbl: "" + (i + min) };
  }

  shuffle( seq );

  if ( seq.length > num ) {
    seq = seq.slice(0, num);
  }
  return seq;

}

function makeSeqText( txt ) {
  var seq = [];
  for ( i = 0; i < txt.length; i++ ) {
    seq[i]= { pos: i, lbl: txt[i] };
  }
  shuffle( seq );
  return seq;
}