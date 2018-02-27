/**
 * jQuery Countdown Clock Plugin by Zawntech
 */
(function ( $ ) {

    // Countdown Clock
    $.fn.countdownClock = function(options) {

        // Reference object.
        var self = this;

        /**
         * Initialize the plugin.
         */

        // Verify that moment is defined or quit.
        try {
            if ( typeof(moment) == "undefined" ) {
                throw('** Moment.js is a required dependency for the countdownClock plugin.');
            };
        } catch ( e ) {
            console.log(e);
            return;
        }

        // An array of assignable option keys.
        var optionKeys = [
            'date',
            'showYears',
            'showMonths',
            'showDays',
            'showHours',
            'showMinutes',
            'showSeconds',
            'updateInterval'
        ];

        // Declare the default options.
        self.options = {
            dateFormat: "YYYY-MM-DD",
            date: undefined,
            showYears: false,
            showMonths: false,
            showDays: true,
            showHours: true,
            showMinutes: true,
            showSeconds: true,
            updateInterval: 1, // Seconds,
            containerClass: 'countdown-clock',
            containerTag: 'div'
        };

        // Set the options.
        if ( typeof( options ) !== "undefined" ) {
            // Loop through the keys passed through options in constructor.
            for( key in options ) {
                // We want to ignore keys that are not in self.optionKeys.
                if ( -1 !== optionKeys.indexOf( key ) ) {
                    // Set the option value internally.
                    self.options[key] = options[key];
                }
            }
        }

        // Verify that a date is specified or quit.
        try {
            if ( typeof(self.options.date) == "undefined" ) {
                throw('** Countdown-Clock requires a "date" parameter set! $("#el").({date: "' + self.options.dateFormat + '");');
            };
        } catch ( e ) {
            console.log(e);
            return;
        }

        // Print the HTML into self element's container( ie, this ).
        self.renderTemplate = function() {

            // Declare a string.
            var html = '';

            var prefix = function(string) {

            };

            // For years, months, days, hours, minutes, seconds; create the strings.
            if ( self.options.showYears ) {
                html += "<span class='years'></span> Years ";
            }
            if ( self.options.showMonths ) {
                html += "<span class='months'></span> Months ";
            }
            if ( self.options.showDays ) {
                html += "<span class='days'></span> Days ";
            }
            if ( self.options.showHours ) {
                html += "<span class='hours'></span> Hours ";
            }
            if ( self.options.showMinutes ) {
                html += "<span class='minutes'></span> Minutes ";
            }
            if ( self.options.showSeconds ) {
                html += "<span class='seconds'></span> Seconds ";
            }

            html = '<' + self.options.containerTag + ' class="' + self.options.containerClass + '">' +
                html +
                '</' + self.options.containerTag + '>';

            // Insert the HTML to DOM.
            self.html( html );
        };

        // Render the template.
        self.renderTemplate();

        // Returns the elements. Needs to be called after self.renderTemplate()
        // so that it can find the correct elements.
        self.el = function() {
            return {
                years: self.find('span.years'),
                months: self.find('span.months'),
                days: self.find('span.days'),
                hours: self.find('span.hours'),
                minutes: self.find('span.minutes'),
                seconds: self.find('span.seconds')
            }
        };

        self.updateClock = function() {

            // Target date moment object.
            var targetDate = moment(self.options.date, self.options.dateFormat);
            var now = moment();

            // Calculations.
            var calc = {
                years: function() {
                    return targetDate.diff( now, 'years');
                },
                months: function() {
                    targetDate.subtract( calc.years(), 'years' );
                    return targetDate.diff( now, 'months');
                },
                days: function() {
                    targetDate.subtract( calc.months(), 'months' );
                    return targetDate.diff( now, 'days' );
                },
                hours: function() {
                    targetDate.subtract( calc.days(), 'days' );
                    return targetDate.diff( now, 'hours' );
                },
                minutes: function() {
                    targetDate.subtract( calc.hours(), 'hours' );
                    return targetDate.diff( now, 'minutes' );
                },
                seconds: function() {
                    targetDate.subtract( calc.minutes(), 'minutes' );
                    return targetDate.diff( now, 'seconds' );
                }
            };

            // Get the clock values.
            var clockValues = {
                years: calc.years(),
                months: calc.months(),
                days: calc.days(),
                hours: calc.hours(),
                minutes: calc.minutes(),
                seconds: calc.seconds()
            };

            // Assign the clock values to the DOM.
            /*
            if ( self.el().years.length && self.el().years.text() != clockValues.years ) self.el().years.text( clockValues.years );
            if ( self.el().months.length && self.el().months.text() != clockValues.months ) self.el().months.text( clockValues.months );
            if ( self.el().days.length && self.el().days.text() != clockValues.days ) self.el().days.text( clockValues.days );
            if ( self.el().hours.length && self.el().hours.text() != clockValues.hours ) self.el().hours.text( clockValues.hours );
            if ( self.el().minutes.length && self.el().minutes.text() != clockValues.minutes ) self.el().minutes.text( clockValues.minutes );
            if ( self.el().seconds.length && self.el().seconds.text() != clockValues.seconds ) self.el().seconds.text( clockValues.seconds );
            */

            if ( self.el().years.length ) self.el().years.text( clockValues.years );
            if ( self.el().months.length ) self.el().months.text( clockValues.months );
            if ( self.el().days.length ) self.el().days.text( clockValues.days );
            if ( self.el().hours.length ) self.el().hours.text( clockValues.hours );
            if ( self.el().minutes.length ) self.el().minutes.text( clockValues.minutes );
            if ( self.el().seconds.length ) self.el().seconds.text( clockValues.seconds );

        };

        // Initialize the clock.
        self.updateClock();

        // Update the clock on an interval.
        setInterval( self.updateClock, ( self.options.updateInterval * 1000 ) );

        // Return object.
        return self;
    };

}( jQuery ));