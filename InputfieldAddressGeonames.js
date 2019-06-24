var InputfieldAddressGeonames = {


	init: function(settings) {
		jeoquery.defaultData.userName = 'gebeer';
		jeoquery.defaultData.style = 'short';

		this.config = {
			editCity: 0,
			optionValue: null
		};
		$.extend(this.config, settings);

		var self = this;
		var inputs = this.getInputs();
		if(!this.config.editCity) inputs.city.attr('readonly', 'readonly');
		// if(!inputs.country.val()) inputs.postcode.attr('readonly', 'readonly').val('').parent('.Inputfield').addClass('muted');
		// if(!inputs.postcode.val()) inputs.city.parent('.Inputfield').addClass('muted');

		if(inputs.country.children('option').length) config.optionValue = inputs.country.children('option').val();
		if(config.optionValue) {
			inputs.country.on('click.init', function() {
				option = $(this).find('option');
				option.html('Loading Countries - Please wait').attr('value', 'wait');
				self.initCountries(inputs);
			});
		} else if(!config.optionValue){
			this.initCountries(inputs);
		}

		this.initPostcodeCity(inputs);

	},

	getInputs: function() {
		var inputs = {
			continent : $('#Inputfield_geoaddress_continent'),
			state : $('#Inputfield_geoaddress_state'),
			country : $('#Inputfield_geoaddress_country'),
			countrycode : $('#Inputfield_geoaddress_countrycode'),
			postcode : $('#Inputfield_geoaddress_postcode'),
			city : $('#Inputfield_geoaddress_city'),
			address1 : $('#Inputfield_geoaddress_address1'),
			address2 : $('#Inputfield_geoaddress_address2')
		};
		return inputs;
	},

	initCountries: function(inputs) {
		var self = this;
		inputs.country.off('click.init');

		inputs.country.on('change blur', function() {
			// if(!$(this).val()) {
				// self.showError(inputs.country, 'You must choose a country!');
				// inputs.postcode.val('');
				// inputs.city.val('');
				// $(this).focus();
			// } else {
				var cc = $(this).children(':selected').data('countrycode');
				var cont = $(this).children(':selected').data('continent');
				$(this).data('countrycode', cc);
				$(this).data('continent', cont);
				inputs.countrycode.val(cc);
				inputs.continent.val(cont);
				// $(this).focus();
				// inputs.postcode.val('').removeAttr('readonly').focus();
				// inputs.city.val('');
				// inputs.postcode.parent('.Inputfield').removeClass('muted');
			// }
		});
		inputs.country.on('focus', function(){
			self.removeError(inputs.country);
		});

		inputs.country.jeoCountrySelect({
			optionValue: 'countryName',
	        callback: function (data) {
	        	inputs.country.children().filter('[value="wait"]').remove();
	    		if(config.optionValue) inputs.country.children().filter('[value=' + config.optionValue + ']').attr('selected','selected');
	            inputs.country.removeAttr('disabled');
	        }
	    });
	},

	initPostcodeCity: function(inputs) {
		var self = this;
		// inputs.postcode.on('focus', function() {
		// 	// console.log('focus');
		// 	if($(this).attr('readonly')) {
		// 		self.showError(inputs.country, 'You must choose a country first!');
		// 		$(this).blur();
		// 	}
		// });
		// inputs.city.on('focus', function() {
		// 	// console.log('focus');
		// 	if(!$(this).val() && !inputs.postcode.val()) {
		// 		self.showError(inputs.postcode, 'You must enter a valid postcode first!');
		// 		$(this).blur();
		// 	}
		// });
		// inputs.postcode.on('blur', function() {
		// 	if(!$(this).val() && inputs.country.val()) {
		// 		self.showError(inputs.postcode, 'You must enter a valid postcode!');
		// 	} else {
		// 		inputs.city.parent('.Inputfield').removeClass('muted');
		// 	}
		// });
	    inputs.postcode.jeoPostalCodeLookup({
	        countryInput: inputs.countrycode,
	        target: inputs.city,
	        callback: function (data) {
	        	// inputs.city.removeAttr('disabled').attr('readonly', 'readonly');
	        	// console.log(data);
	        	self.removeError(inputs.postcode);
	        	// console.log(data);
	        	// populate state from city data
	        	if(data.adminName1) inputs.state.val(data.adminName1);
				// wrong postcode	       	
	        	if(!data) {
	        		inputs.city.val('');
	        		self.showError(inputs.postcode, 'We could not find the postcode and city. Please make sure the postcode is correct and enter the city yourself');
	        		// inputs.postcode.focus();
	        	}
	        }
	    });

	},

	showError: function(input, msg) {
		errContainer = input.prev('.ui-state-error');
		if(!errContainer.length) {
			input.before('<p class="ui-state-error"><i class="fa fa-fw fa-flash"></i><span>' + msg + '</span></p>');
		} else {
			errContainer.find('span').html(msg);
		}
		// input.select();
	},

	removeError: function(input) {
		error = input.prev('.ui-state-error');
    	if(error.length) error.remove();
	}

};

// $(document).ready(function() {
// 	InputfieldAddressGeonames.init({alloweditCity: 1});
// });

