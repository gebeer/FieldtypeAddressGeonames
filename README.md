# FieldtypeAddressGeonames Module for ProcessWire
## **This module is in an early stage of development. Use at your own risk**

This Fieldtype for ProcessWire holds an address consisting of country, countrycode, postcode and city, latitude and longitude.
Country, postcode and city data are pulled from http://www.geonames.org using a slightly modified version of [jeoQuery](http://tompi.github.io/jeoquery/).

Optionally this fieldtype can store latitude and longitude to interact with [FieldtypeLeafletMapMarker](http://modules.processwire.com/modules/fieldtype-leaflet-map-marker/). When this option is chosen the geocoding of the address to latitude/longitude is made with help of the Google Maps API. The resulting values may be used to populate any kind of map (whether Leaflet Maps or another).

----------

## Installation

1. Copy all of the files for this module into /site/modules/FieldtypeAddressGeonames/
2. In your admin, go to the Modules screen and "check for new modules." Under the 'Fieldtype' section, install the 'Geonames Address' module (FieldtypeAddressGeonames). This will also install the InputfieldAddressGeonames module which provides the address inputs.
3. In your admin, go to Setup > Fields > Add New Field. Choose "AddressGeonames" as the type. If you are not sure what to name your field, simply "address" is a good one! Once created, configure the settings on the *input* tab.
4. Add your new "map" field to one or more templates, as you would any other field.

### Field Settings

1. "Enable editing of City field": Manual editing of the city field is disabled by default. If you want to enable it, check this box.
2. "Interact with InputfieldLeafletMapMarker for geocoding": This will enable storage of latitude/longitude in hidden fields. The module automatically detects the name of your InputfieldLeafletMapMarker on that page template and will write latitude/longitude to and from that field to its own data. When enabled, the Adress/Latitude/Longitude and Zoom inputs of InputfieldLeafletMapMarker will be hidden. If you want to use this option, I recommend placing your address field and your location (InputfieldLeafletMapMarker)  field next to each other. But this is not mandatory to make the fields work together.
![Screenshot of address field next to leaflet map field](/images/001.png)

### How to use from the page editor

1. Create or edit a page using one of the templates you added the "address" field to.
2. Choose a country from the list (postcode and city fields are only editable after a country has been chosen)
3. Enter a postcode. When you leave the postcode field the corresponding city will be pulled from geonames.org
4. By default you can not change/edit the city field. You can allow edit with the corresponding field setting, though.
5. Fill in Address fields (optional)
6. Save the page. The country code will be saved in the background. If you have enabled "Interact with InputfieldLeafletMapMarker for geocoding" in the field settings, the available address details will be used to geocode latitude/longitude in the background. Those will be saved to hidden fields and are available through the API. If the exact address cannot be found for geocoding, the lat/lng for the city will be saved and you will get a warning that you need to set the marker in your map field manually.  
_If the geocoding does not work, please ensure that your browser is not blocking the execution of any scripts._


### How to use from the API, in your template files

In your template files, you can utilize this data.

Lets assume that your field is called 'address'. Here is how you would access the components of it from the API:
```````````
echo $page->address->country;	// outputs the country
echo $page->address->countrycode;		// outputs the country code
echo $page->address->postcode;     // outputs the postcode
echo $page->address->city;     // outputs the city
echo $page->address->adress1;     // outputs the adress1
echo $page->address->adress2;     // outputs the adress2
echo $page->address->lat;     // outputs the latitude (only available if set in the field settings otherwise 0)
echo $page->address->lng;     // outputs the longitude (only available if set in the field settings otherwise 0)
`````````

-------------


### Contributors

* [gebeer](https://processwire.com/talk/profile/1920-gebeer/) created this module and extended Mats' work on the FieldtypeLeafletMapMarker, adding the Inline Scripts module and leaflet-providers for choice of map tiles.
* [Ryan Cramer](https://processwire.com/talk/profile/2-ryan/) provided the original Google Maps module.
* [Mats](https://processwire.com/talk/profile/67-mats/) produces the original Leaflet version.
* [netcarver](https://processwire.com/talk/profile/465-netcarver/) added callback formatters for marker and popover content generation. He also added AwesomeMarker support.
