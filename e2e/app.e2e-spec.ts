import {browser, element, by} from 'protractor';

describe('ra-ng quickstart E2E Tests', function () {

    let expectedMsg = 'Work in progress ra-ng 2.x';

    beforeEach(function () {
        browser.get('');
    });

    it('should display: ' + expectedMsg, function (done) {
        expect(element(by.css('h2')).getText()).toEqual(expectedMsg);
        done();
    });

});

