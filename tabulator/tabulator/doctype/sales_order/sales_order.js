
var total_qty=0;

frappe.ui.form.on('Sales Order Item', {
    has_schedule: function(frm,cdt,cdn) {
        var schedule =[]
        var m = locals[cdt][cdn];
        // var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        // monthNames.forEach(function (value) {
        //     schedule.push({ 'month': value });
        // });
        if (m.has_schedule) {
            var d = new frappe.ui.Dialog({
                title: 'Schedule',
                fields: [
                    {
                        fieldname: 'schedule',
                        label: 'Schedule',
                        fieldtype: 'Table',
                        options:'Schedule',
                        // cannot_add_rows: true,
                        // cannot_delete_rows: true,
                        fields: [
                            {
                                fieldtype: 'Select',
                                fieldname: 'month',
                                label: 'Month',
                                options:["Jan",
                                        "Feb",
                                        "Mar",
                                        "Apr",
                                        "May",
                                        "June",
                                        "July",
                                        "Aug",
                                        "Sept",
                                        "Oct",
                                        "Nov",
                                        "Dec"],
                                        in_list_view: 1
                            },
                            {
                                fieldtype: 'Date',
                                fieldname: 'date',
                                label: 'Date',
                                in_list_view: 1
                            },
                            {
                                fieldtype: 'Int',
                                fieldname: 'qty',
                                label: 'Qty',
                                in_list_view: 1
                            }
                        ]
                    }
                ],
                primary_action_label: 'OK',
                primary_action: function() {
                    var values = d.get_values();
                    if(!values){
                        return;
                    }
                    var schedule_table=values.schedule ||[];
                    for( var i=0;i<schedule_table.length;i++){
                        var schedule_row=schedule_table[i];
                        total_qty += schedule_table[i]["qty"]
                        var child = cur_frm.add_child('schedule')
                            child.item_code=m.item_code,
                            child.month = schedule_row["month"],
                            child.date = schedule_row["date"],
                            child.qty = schedule_row["qty"]
                            
                    }
                    frm.set_value('total_schedule_quantity',total_qty)
                    
                    d.hide();
                    cur_frm.refresh_fields('schedule');
                }
            });
            d.show();
        }
    }
});
