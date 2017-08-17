var Podcast = require('podcast2')
var xtend = require('xtend')

var defaultFeedOptions = {
	managingEditor: "Joseph Dykstra <josephdykstra@gmail.com> (http://www.josephdykstra.com)",
	webMaster: "Joseph Dykstra <josephdykstra@gmail.com> (http://www.josephdykstra.com)",
	language: "en-US",
	pubDate: "2017-08-14",
	itunesOwner: { name: "Joseph Dykstra", email: "josephdykstra@gmail.com" },
	itunesExplicit: false
}

module.exports = function makeFeed(name) {
	var opts = require('../content/' + name + '/' + name + '.json')
	if (!opts || typeof opts !== 'object') {
		throw new Error('Expected `opts` to be an object')
	} else if (!opts.feed || typeof opts.feed !== 'object') {
		throw new Error('Expected `opts.feed` to be an object')
	} else if (!opts.episodes || typeof opts.episodes !== 'object' || !Array.isArray(opts.episodes)) {
		throw new Error('Expected `opts.episodes` to be an array')
	}

	var dynamicDefaults = {
		feed_url: 'https://artskydj.github.io/podcast-feeds/rss/' + name + '.rss',
		image_url: 'https://artskydj.github.io/podcast-feeds/src-json/' + name + '/' + opts.feed.IMAGE_FILE,
		itunesSubtitle: opts.feed.description,
		itunesSummary: opts.feed.description,
		itunesAuthor: opts.feed.author,
		itunesCategory: (opts.feed.category || []).map(function(c){ return { text: c, subcats: [] } })
	}
	dynamicDefaults.itunesImage = dynamicDefaults.image_url

	var feedOpts = xtend(defaultFeedOptions, dynamicDefaults, opts.feed)
	var feed = new Podcast(feedOpts)

	

}


