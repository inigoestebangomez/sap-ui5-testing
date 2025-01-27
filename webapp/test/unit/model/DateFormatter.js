sap.ui.define([
	"sap/ui/demo/bulletinboard/model/DateFormatter",
	"sap/ui/core/Locale",
	"sap/ui/core/date/UI5Date"
], function(DateFormatter, Locale, UI5Date) {
	let oFormatter = null;
	QUnit.module("DateFormatter", {
		beforeEach: function() {
			oFormatter = new DateFormatter({
				now : function() {
					return UI5Date.getInstance(2015, 2, 14, 14, 0, 0, 0).getTime();
				},
				locale: new Locale("en-US")
			});
		}
	});
    QUnit.test("Should return empty string if no date is given", function(assert) {
		let sFormattedDate = oFormatter.format(null);
		assert.strictEqual(sFormattedDate, "");
	});
	QUnit.test("Should return time if date from today", function(assert) {
		let oDate = UI5Date.getInstance(2015, 2, 14, 12, 5, 0, 0);
		let sFormattedDate = oFormatter.format(oDate);
		assert.strictEqual(sFormattedDate, "12:05 PM");
	});
	QUnit.test("Should return 'Yesterday' if date from yesterday", function(assert) {
		let oDate = UI5Date.getInstance(2015, 2, 13);
		let sFormattedDate = oFormatter.format(oDate);
		assert.strictEqual(sFormattedDate, "Yesterday");
	});
	QUnit.test("Should return day of the week if date < 7 days ago", function(assert) {
		let oDate = UI5Date.getInstance(2015, 2, 8);
		let sFormattedDate = oFormatter.format(oDate);
		assert.strictEqual(sFormattedDate, "Sunday");
	});
	QUnit.test("Should return date w/o time if date > 7 days ago", function(assert) {
		let oDate = UI5Date.getInstance(2015, 2, 7);
		let sFormattedDate = oFormatter.format(oDate);
		assert.strictEqual(sFormattedDate, "Mar 7, 2015");
	});
});