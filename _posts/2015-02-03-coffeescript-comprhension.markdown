---
layout: post
title: CoffeeScript comprhension
date: 2015-02-03 09:48:54.000000000 +01:00
---
Just some days ago, while working on CoffeeScript test files, I noticed that generated Javascript was not honestly the one I was expecting

```coffeescript
describe 'Assertion tests', ->
  describe 'Template tests', ->
    for uri in fixtures.testUris
      describe "Testing #{uri.uriTemplate}", ->
        res = validations.validateUriTemplate uri.uriTemplate
        it "Result validation should be #{uri.expectedResult}", ->
          console.log "if #{uri.expectedResult} is true"
          if uri.expectedResult is true
            assert.isTrue res
          else
            assert.typeOf res, 'string'
```

And this is the generated Javascript, that you can also verify by yourself on [CoffeeScript website](http://coffeescript.org)

```javascript
describe('Assertion tests', function() {
  return describe('Template tests', function() {
    var uri, _i, _len, _ref, _results;
    _ref = fixtures.testUris;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      uri = _ref[_i];
      _results.push(describe("Testing " + uri.uriTemplate, function() {
        var res;
        res = validations.validateUriTemplate(uri.uriTemplate);
        return it("Result validation should be " + uri.expectedResult, function() {
          console.log("if " + uri.expectedResult + " is true");
          if (uri.expectedResult === true) {
            return assert.isTrue(res);
          } else {
            return assert.typeOf(res, 'string');
          }
        });
      }));
    }
    return _results;
  });
});
```

The cumbersome thing, actually, is the **_result** array being populated and then returned after the **for** loop.
As we know, CoffeScript consider the last function istruction as a return one, and since in my case it is a for block, it considers to return the entire result.

Obiously this is not the intended behavior: I am just looping through an array and nothing else.
This is a code taken from test (so honestly I could also don't care about memory waste), but in production code it could be worth to avoid this.

The solution is pretty simple:

```coffeescript
describe 'Assertion tests', ->
  describe 'Template tests', ->
    for uri in fixtures.testUris
      describe "Testing #{uri.uriTemplate}", ->
        res = validations.validateUriTemplate uri.uriTemplate
        it "Result validation should be #{uri.expectedResult}", ->
          console.log "if #{uri.expectedResult} is true"
          if uri.expectedResult is true
            assert.isTrue res
          else
            assert.typeOf res, 'string'
      undefined
```

Explicitly specifing the return, array creation and population is completely avoided.

I definitely disagree with the "last istruction is a return one" facility, actually.
