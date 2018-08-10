$(function() {
	Galleria.loadTheme("https://cdnjs.cloudflare.com/ajax/libs/galleria/1.5.7/themes/classic/galleria.classic.min.js").configure({transition: "fade"});
	var g = {
		abstract: {set: "72157663613653419", tag: "abstract"},
		figures: {set: "72157663122488679", tag: "figures"},
		vandalism: {set: "72157656087051975", tag: "vandalism"},
		ravensbourne: {set: "72157656059298655", tag: "ravensbourne"},
		aplha: {set: "72157652167823921", tag: "aplha"},
		places1: {set: "72157647897931254", tag: "places1"},
		places2: {set: "72157680342839503", tag: "places2"},
		fest: {set: "72157647897269204", tag: "fest"},
		holga: {set: "72157646711213358", tag: "holga"},
		assorted: {set: "72157647107363402", tag: "assorted"},
		interval: {set: "72157647107024312", tag: "interval"},
		royal: {set: "72157647058898826", tag: "royal"},
		solarised: {set: "72157647119896135", tag: "solarised"},
		light: {set: "72157647106866472", tag: "light"},
		passive: {set: "72157647058775116", tag: "passive"},
		incognito: {set: "72157647058547856", tag: "incognito"},
		art: {set: "72157646698234267", tag: "art"},
		cyborg: {set: "72157646697855169", tag: "cyborg"},
		crest: {set: "72157646698041797", tag: "crest"},
		designs: {set: "72157646703093220", tag: "designs"},
		closed: {set: "72157646697568489", tag: "closed"},
		fauna: {set: "72157647905448693", tag: "fauna"},
		"4svciety": {set: "72157682756177700", tag: "4svciety"},
		eddygrant: {set: "72157681869499180", tag: "eddygrant"},
		beatfreeks: {set: "72157680397025793", tag: "beatfreeks"},
		scanned: {set: "72157663115670011", tag: "scanned"},
		kojey: {set: "gejHlqqRoAM", tag: "kojey"},
		trip: {set: "qWoNMJ0HeaY", tag: "trip"},
		dede: {set: "dYSLvmaZlh0", tag: "dede"},
		ab: {set: "KkCTDiIECM8", tag: "ab"},
		laswap: {set: "jYZiBss_eSU", tag: "laswap"}
	};

	var imageSize = 'big';
	var imageCrop = window.innerWidth < 768 ? false : true;
	var id = $(".index-slideshow").attr("id");

	if ($(".index-slideshow").length) {
		if (id == 'assorted') {
			Galleria.run( "#"+id, { imageCrop: imageCrop, flickr:"set:"+g[id].set, flickrOptions: { imageSize: imageSize }, autoplay: 3000 })
		} else {
			Galleria.run( "#"+id, { imageCrop: imageCrop, flickr:"set:"+g[id].set, flickrOptions: { imageSize: imageSize }})
		}
	}

	$(".work .thumb").each(function(){
		try {
			var id = this.id;
			Galleria.run( ".work .thumb#"+ id +" .cover-image", { flickr:"search:nz-"+g[id].tag+"-cover", flickrOptions: { max: 1 }, imageCrop: true })
		} catch(err) {
			console.log(err)
		}
	});

});