import frappe
def valid(doc,method):
    if doc.grand_total<=3000:
        frappe.msgprint("ok grand total is allowed you")
    else:
        frappe.throw("no you are higher than grand total please check it once")
    