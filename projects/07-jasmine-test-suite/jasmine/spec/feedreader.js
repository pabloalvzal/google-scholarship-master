/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {
	let feedIndex = 0;
	/*
  First test suite
	 */
	describe('RSS Feeds', function() {
		/* First test - makes sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty.
		 */
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* Loop through each feed
		 * in the allFeeds object and ensure it has a URL defined
		 * and that the URL is not empty.
		 */
		it('have an URL and the URL is not empty', function() {
			// Testing a for Loop
			for (let i = 0; i < allFeeds.length; i++) {
				let feed = allFeeds[i];
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toBe('');
			}
		});
		/* Test that the allFeeds object has a name defined
		 * and that the name is not empty.
		 */
		it('have a name defined and the name is not empty', function() {
			// Testing a forEach iterator
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name).not.toBe('');
			});
		});
	});

	/* New test suite named "The menu" */
	describe('The menu', function() {
		let spyEvent;
		let menuHidden;
		beforeEach(function() {
			spyEvent = spyOnEvent('#burger-icon', 'click');
		});

		/* Ensure the menu element is
		 * hidden by default.
		 */
		it('is hidden by default', function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

		/* Ensures the menu changes
		 * visibility when the menu icon is clicked. This test
		 * should have two expectations: does the menu display when
		 * clicked and does it hide when clicked again.
		 */
		it('should invoke the burger-icon click event and remove .menu-hidden from body', function() {
			$('#burger-icon').trigger("click");
			expect('click').toHaveBeenTriggeredOn('#burger-icon');
			expect(spyEvent).toHaveBeenTriggered();
			expect($('body').hasClass('menu-hidden')).toBe(false);
		});

		it('should invoke the burger-icon click event (again) and add .menu-hidden to body', function() {
			$('#burger-icon').trigger("click");
			expect('click').toHaveBeenTriggeredOn('#burger-icon');
			expect(spyEvent).toHaveBeenTriggered();
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});

	describe('Initial Entries', function() {

		beforeEach(function(done) {
			loadFeed(feedIndex, function() {
				console.log(feedIndex);
				done();
			});
		});
		/* Write a test that ensures when the loadFeed
		 * function is called and completes its work, there is at least
		 * a single .entry element within the .feed container.
		 * Remember, loadFeed() is asynchronous so this test will require
		 * the use of Jasmine's beforeEach and asynchronous done() function.
		 */
		it('have at least one entry', function(done) {
			expect($('.feed .entry').length > 0).toBe(true);
			done();
		});
	});

	describe('New feed selection', function() {
		/* Ensure that when a new feed is loaded
		 * by the loadFeed function that the content actually changes.
		 */
		let feed, newfeed;
		beforeEach(function(done) {
			loadFeed(feedIndex, function() {
				feedIndex++;
				done();
			});
		});

		it('loads first selection', function(done) {
			feed = $('.feed').html(); // first feed
			expect(feed.length > 0).toBe(true);
			done();
		});

		it('loads the second selection, which is different to the first', function(done) {
			newfeed = $('.feed').html(); // new feed
			expect(feed.length === newfeed.length).toBe(false);
			done();
		});
	});

	describe('New feed selection, with nested loop approach', function() {
		/* Same test as above.
		 */
		feedIndex = 0;
		beforeEach(function(done) {
			loadFeed(feedIndex, function() {
				feed = $('.feed').html(); // first feed
				feedIndex++;
				loadFeed(feedIndex, function() {
					newfeed = $('.feed').html(); // new feed
					done();
				});
			});
		});

		it('loads the second selection, which is different to the first', function(done) {
			expect(feed.length === newfeed.length).toBe(false);
			done();
		});
	});
}());