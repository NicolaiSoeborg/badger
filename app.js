var Badge = Backbone.Model.extend({
	// defauls
	defaults: {
		upper_text: "Harebo '16",
		upper_path: "M 80, 150 c 0, -100, 140, -100, 140, 0",

		middle_text: "Søborg",

		lower_text: "C. Software",
		lower_path: "M 60, 150 c 0, 120, 180, 120, 180, 0"
	}
});

var BadgeView = Backbone.View.extend({
	template: _.template( $("#template-badge").html() ),
	initialize: function () {
		console.log("BadgeView initialize");
	},
    render: function () {
    	var self = this;
    	this.$el.html(""); // clear html
    	this.collection.each(function(badge) {
    		self.$el.html( self.$el.html() + self.template(badge.toJSON()) );
		});
		return this;
    }
});

var BadgeCollection = Backbone.Collection.extend({ model: Badge });
