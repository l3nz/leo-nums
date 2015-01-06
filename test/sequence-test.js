// Browser tests
var assert = buster.referee.assert;
var refute = buster.referee.refute;




buster.testCase("Sequence check", {
    "seq out of order": function () {

    	var seq = [
    		{ pos: 0, id: 19 },
    		{ pos: 1, id: 3}
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


    "seq missing positions": function () {

        var seq = [
            { pos: 0, id: 0 },
            { pos: 2, id: 1},
            { pos: 4, id: 2},
            { pos: 6, id: 3},
              
        ];

        assert( isSeqOk( seq ) == true );
    },

    "seq missing positions and nums": function () {

        var seq = [
            { pos: 0, id: 3 },
            { pos: 2, id: 4},
            { pos: 4, id: 5},
            { pos: 6, id: 7},
              
        ];

        assert( isSeqOk( seq ) == true );
    },


    "seq missing positions and nums - random order": function () {

        var seq = [
            { pos: 2, id: 4},
            { pos: 0, id: 3 },
            { pos: 4, id: 5},
            { pos: 6, id: 7},
              
        ];

        assert( isSeqOk( seq ) == true );
    },


    "seq missing positions and nums but wrong": function () {

        var seq = [
            { pos: 0, id: 3 },
            { pos: 2, id: 4},
            { pos: 4, id: 7},
            { pos: 6, id: 5},
              
        ];

        assert( isSeqOk( seq ) == false );
    },

});

