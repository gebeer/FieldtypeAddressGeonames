var InputfieldAddressGeonamesLeaflet = {

	init: function(settings) {
		var self = this;
		this.config = {
			leafletname: ''
		};
		$.extend(this.config, settings);
		inputs = this.getInputs();
		$.each(inputs.leaflet, function(name, index){
			if(name == 'input') return;
			// console.log(name);
			$(this).on('change.custom', function() {
				// write geocoded lat/lng to addressgeopnames fields
				inputs.geoaddress[name].val($(this).val());
				InputfieldAddressGeonamesLeaflet.showError(inputs.leaflet['input'], 'Click Save to save the new location on the map.');
			});

		});
	},
	
	getInputs: function() {
		var inputs = {
			'leaflet' : {
				input: $('.InputfieldLeafletMapMarker'),
				lat: $('#_Inputfield_' + this.config.leafletname + '_lat'),
				lng: $('#_Inputfield_' + this.config.leafletname + '_lng')
			},
			'geoaddress' : {
				lat: $('#Inputfield_geoaddress_lat'),
				lng: $('#Inputfield_geoaddress_lng')
			}
		};
		return inputs;
	},

	showError: function(input, msg) {
		errContainer = input.prev('.ui-state-error');
		if(!errContainer.length) {
			input.find('.description').append('<p class="ui-state-error"><i class="fa fa-fw fa-flash"></i><span>' + msg + '</span></p>');
		} else {
			errContainer.find('span').html(msg);
		}
		// input.select();
	},


};

