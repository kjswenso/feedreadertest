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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //ensures all feeds have defined url and is not empty
        it('URL is defined and not empty', function() {
            for(let feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });


        //ensures all feeds have defined name and is not empty
         it('name is defined and not empty', function() {
            for(let feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
         });
    });


    //test suite for The Menu
    describe('The Menu', function() {
        
        //ensure the menu is hidden by default
        it('menu hidden by default', function() {
            const hidMenu = document.querySelector('.menu-hidden');
            expect(hidMenu.classList.contains('menu-hidden')).toBe(true);
         });

        //ensures menu shows/hides upon click
        it('menu visibilty toggles', function() {
            const hidMenu = document.querySelector('.menu-hidden');
            const menu = document.querySelector('.menu-icon-link');
            
            //menu appears when clicked
            menu.click();
            expect(hidMenu.classList.contains('menu-hidden')).toBe(false);

            //menu disappears on another click
            menu.click();
            expect(hidMenu.classList.contains('menu-hidden')).toBe(true);
          });

    });


    //test suite for Initial Entries
    describe('Initial Entries', function() {
        //load feed before each function
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        
        //async test to make sure single entry upon feed load
         it('at least single entry upon load', function() {
            const feed = document.querySelector('.feed');
            expect(feed.children.length > 0).toBe(true);
         });

    });

    //test suite for New Feed Selection
    describe('New Feed Selection', function() {
        const entry = document.querySelector('.feed');
        let firstEntry;
        let secondEntry;
        //load two tests to add content
        beforeEach(function(done) {
            loadFeed(0, function() {
                firstEntry = entry.innerText;
                loadFeed(1, function() {
                    secondEntry = entry.innerText;
                    done();
                });
            });
        });

      //checks that new loaded feed has different content
        it('content changes when added', function() {
            expect(firstEntry).not.toMatch(secondEntry);
        });
    });
        
}());
