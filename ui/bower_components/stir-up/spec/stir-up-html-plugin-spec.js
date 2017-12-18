describe("functions for constructing HTML", function() {
	it("should construct markup", function() {
		StirUp.Html(window);
		expect(el('whatever').make()).toBe("<whatever></whatever>");
		expect(div().make()).toBe("<div></div>");
		expect(audio().make()).toBe("<audio></audio>");
		expect(href()).toBeDefined();
		
	});
	
	it("should try and not step on it's own toes", function() {
		expect(content).toBeDefined();
		expect(_content).toBeDefined();
		
		expect(content().make()).toBe("<content></content>");
		expect(_content("foo")._make_attribute()).toBe("content=\"foo\"");
	});
	
	it("should support nested elements", function() {
		expect(
			ol( attr('class', 'beautiful'),
				li('Foo'),
				li('Bar')
			).make()).toBe("<ol class=\"beautiful\"><li>Foo</li><li>Bar</li></ol>");
	});
	
	it("should support conditionals", function() {
		expect(
			ul(
				li( when(false, draggable(false)), 'Ferris'),
				li( when(true, draggable(true)), 'Cameron'),
				when( false, li('Rooney')),
				li( when(false, draggable(false)), 'Sloane')
			).make()).toBe("<ul><li>Ferris</li><li draggable=\"true\">Cameron</li><li>Sloane</li></ul>");
	});
	
	it("should support iteration", function() {
		var marx_brothers = ['Groucho', 'Harpo', 'Chico', 'Gummo', 'Zeppo'];
		expect(
			ol( _class('marx'),
				iterate(marx_brothers, function (bro) {
					return li( _class(bro), bro).make();
				})
			).make()).toBe("<ol class=\"marx\"><li class=\"Groucho\">Groucho</li><li class=\"Harpo\">Harpo</li><li class=\"Chico\">Chico</li><li class=\"Gummo\">Gummo</li><li class=\"Zeppo\">Zeppo</li></ol>");
	});
	
	it("should support building html in stages", function() {
		var brothers = ol( _class('marx') );
	
		var harpo = li('Harpo');
		harpo.set( draggable(true) );
		brothers.append(harpo);
	
		brothers.prepend( li('Groucho') );
		brothers.append( li('Chico') );
		
		expect(brothers.make()).toBe("<ol class=\"marx\"><li>Groucho</li><li draggable=\"true\">Harpo</li><li>Chico</li></ol>");
	});
	
	it("should support html attributes", function() {
		expect(
			a( href('http://foo/'), "Hello" ).make()).toBe("<a href=\"http://foo/\">Hello</a>");
	});
});