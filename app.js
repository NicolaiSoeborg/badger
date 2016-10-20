var Badge = Backbone.Model.extend({
	defaults: {
		_id: 0,
		upper_text: "Harebo '16",
		upper_path: "M 80, 150 c 0, -100, 140, -100, 140, 0",
		middle_text: "Søborg",
		lower_text: "C. Software",
		lower_path: "M 60, 150 c 0, 120, 180, 120, 180, 0"
	},
	initialize: function() {
		this.set("_id", ((Math.random() * 1e9) | 0)); // TODO: should be a nonce
	}
});

var BadgeCollection = Backbone.Collection.extend({ model: Badge });


var BadgeView = Backbone.View.extend({
	template: _.template( "Loading..." ),
	initialize: function () {
		var self = this;
		$.get("badge.tpl", function(tpl) {
			self.template = _.template( tpl );
		})
	},
	render: function () {
		var _html = "";
		var self = this;
		this.collection.each(function(badge) {
			_html += self.template(badge.toJSON());
		});
		this.$el.html(_html);
		return this;
	}
});
