const { assert } = require('chai');
var chai = require('chai'),
    expect = chai.expect;
chai.use(require('chai-like'));
chai.use(require('chai-things'));

var webdriver = require('selenium-webdriver'),
    { describe, it, after, before, beforeEach, afterEach } = require('selenium-webdriver/testing');
    By = webdriver.By,
    until = webdriver.until,
    Keys = webdriver.Key;

var driver;

describe('test our senario', function () {
    this.timeout(8000);
    beforeEach(function () {
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .build();
        driver.get('http://www.google.com');
    });

    afterEach(function () {
        driver.quit();
    });

    it('assert url and title in search result', function () {
        var results = [];

        driver.findElement(By.name('q')).sendKeys('BitoPro', Keys.RETURN);
        driver.findElements(By.xpath("//div[@class='yuRUbf']")).then(function (div) {
            
            for (var i = 0; i < div.length; i++) {
                var title = div[i].findElement(By.xpath('.//h3')).getText().then(function (text) {
                    results.push(text);
                })
                var hyperlink = div[i].findElement(By.xpath("./a")).getAttribute('href').then(function (link) {
                    results.push(link);
                })
            }
            return results;
        }).then(function (ary) {
            
            expect(ary).to.be.an('array').that.contains.something.like('BitoPro 台灣幣託交易所'); 
            expect(ary).to.be.an('array').that.contains.something.like('https://www.bitopro.com/'); 
        })
    });
    
})
