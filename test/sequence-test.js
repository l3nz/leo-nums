// Browser tests
var assert = buster.referee.assert;
var refute = buster.referee.refute;




buster.testCase("Sequence", {
    "seq out of order": function () {

    	var seq = [
    		{ pos: 0, id: 3 },
    		{ pos: 1, id: 19}
    	];

        assert( isSeqOk( seq ) == false );
    },

	"seq in order": function () {

    	var seq = [
    		{ pos: 0, id: 0 },
    		{ pos: 1, id: 1}
    	];

        assert( isSeqOk( seq ) == true );
    },


});

