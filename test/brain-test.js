// Browser tests
var assert = buster.referee.assert;
var refute = buster.referee.refute;




buster.testCase("Brain", {
    "fullnumeric": function () {

    	var d = {
            exercise: "ALL4",
            numeric: true,
            min_num: 1,
            max_num: 4,
            n_items: 20
        };

        var seq = makeSeq( d );
        addLog( JSON.stringify( seq ));

        assert( seq.length == 4 );
    },

});

