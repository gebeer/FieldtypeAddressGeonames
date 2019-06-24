<?php

/**
 * Class to hold an address with country, city, postcode, address1 and address2
 *
 */
class GeoAddress extends WireData {



    public function __construct() {
        $this->set('country', '');
        $this->set('continent', '');
        $this->set('state', '');
        $this->set('countrycode', '');
        $this->set('city', '');
        $this->set('postcode', '');
        $this->set('address1', '');
        $this->set('address2', '');
        $this->set('lat', '');
        $this->set('lng', '');
    }

    public function set($key, $value) {
        $value = wire('sanitizer')->text($value);

        return parent::set($key, $value);
    }

    public function get($key) {
        return parent::get($key);
    }

    /**
     * If accessed as a string, then just output the concatenated values
     *
     */
    public function __toString() {
        $out = '';
        $out .= ($this->address1) ? "$this->address1, " : '';
        $out .= ($this->address2) ? "$this->address2, " : '';
        $out .= ($this->postcode) ? "$this->postcode, " : '';
        $out .= ($this->city) ? "$this->city, " : '';
        $out .= ($this->country) ? "$this->country" : '';
        return $out;
    }
}
