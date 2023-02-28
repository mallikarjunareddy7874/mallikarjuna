frappe.DataTabulator = Class.extend({
    init: function (report, opts) {
      $.extend(this, opts);
      this.report = report;
      this.options = this.options || this.get_options();
      this.setup();
      this.make(report);
    },
  
    setup() {
      let me = this;
      this.toggle_frappe_datatable(true);
  
      // monkey-patch refresh as frappe query_report does not provide refresh event
      this.original_refresh = this.report.refresh;
      this.report.refresh = function () {
        me.original_refresh.apply(this, arguments).then(() => {
          me.set_data();
        });
      };
      // destroy tabulator when navigating away
      window.addEventListener("hashchange", this.destroy.bind(this), {
        once: true,
      });
    },
  
    get_options() {
      // default tabulator options
      return {
        height: 450,
        layout: "fitColumns",
        placeholder: "Nothing to Show",
        data: [],
        // If you set the autoColumns option to true,
        // every time data is loaded into the table through the data option or through the setData function,
        // Tabulator will examine the first row of the data and build columns to match that data.
        autoColumns: true,
        autoColumnsDefinitions: function (definitions) {
          return report.columns.map((column) => {
            column.title = column.label;
            column.field = column.fieldname;
            // add header filter to every column
            column.headerFilter = true;
            return column;
          });
  
        },
      };
    },
  
    make() {
      let me = this,
        el = $("<div id='tabu-lator' class='table-bordered;'></div>");
      el.insertBefore($(".report-wrapper"));
      console.log(this.options);
      this.tabulator = new Tabulator("#tabu-lator", this.options);
    },
  
    destroy(e) {
      this.report.refresh = this.original_refresh;
      this.tabulator && this.tabulator.destroy();
      $("#tabu-lator").remove();
      this.toggle_frappe_datatable(false);
      // need to set route_options here to force refresh when navigating back to same report
      frappe.route_options = { _t: new Date().getTime() };
    },
  
    set_data() {
      if (this.tabulator) {
        this.tabulator.setData(this.report.data.length ? this.report.data : []);
      }
    },
  
    toggle_frappe_datatable(flag) {
      // hide frappe report datatable and message area
      $(".report-wrapper").toggleClass("hidden d-none", flag);
      this.report.$message.toggleClass("hidden d-none", flag);
    },
  });