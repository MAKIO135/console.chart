console.chart = function( data, _params ){
    function intFormat( int, n ){
        let a = ( '' + int ).split( '' ).reverse();
        let len = a.length;
        while( a.length < n ){
            a.push( ' ' );
        }
        return( a.reverse().join( '' ) );
    }
    // defaults
    let params = {
        title: null,
        height: 10,
        color: '#000',
        background: null,
        min: Math.min( ...data ),
        max: Math.max( ...data )
    };
    // extend defaults with passed options
    for (var key in params) {
        if (_params && _params.hasOwnProperty(key)) {
            params[key] = _params[key];
        }
    }

    let len = ( '' + params.max ).length;
    let chart = new Array( params.height).fill( 0 ).map( ( d, i ) =>
        i == 0 ? intFormat( params.max, len ) + '| ' :
        i < params.height - 1 ? intFormat( '', len ) + '| ' :
        // i < params.height - 1 ? intFormat( params.min + ( params.max - params.min ) / (params.height - 1) * ( params.height - 1 - i ), len ) + '| ' :
        intFormat( params.min, len ) + '|_'
    );

    data.forEach( d =>
        chart.forEach( ( c, i ) =>
            chart[ i ] += d > ( chart.length - i ) * ( ( params.max - params.min ) / params.height ) ?  ( i < ( params.height - 1 ) ? '█ ' : '█_') : ( i < ( params.height - 1 ) ? '  ' : '__')
        )
    );
    chart.forEach( ( c, i ) => chart[ i ] = ' ' + chart[ i ] + ' ' );

    let empty = new Array( chart[ 0 ].length ).fill( ' ' ).join('');
    chart.splice(0, 0, empty);

    if( params.title ){
        params.title = ' ' + params.title;
        while ( params.title.length < chart[ 0 ].length ) {
            params.title += ' ';
        }

        chart.splice( 0, 0, params.title );
        chart.splice( 0, 0, empty );
    }

    chart.push( empty );

    console.log( '%c' + chart.join( '\n' ), 'color: ' + params.color + ';' + ( params.background ? 'background: ' + params.background + ';' : '' ) );
};
