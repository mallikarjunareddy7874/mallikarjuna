# Copyright (c) 2022, mallikarjuna and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class serversidescripting(Document):
    
     pass
def test(doc,method):
     frappe.msgprint('hey hello')
    
    
	#  def validate(self):
    #   doc.document() 
	# def before_save(self):
	# 	frappe.throw("hello frappe from before_save event")
    # def before_insert(self):
    #     frappe.throw("hello frappe from before_insert event")
    # def after_insert(self):
    #     frappe.throw("hello frappe from after_insert event")
	# def after_submit(self):
	# 	frappe.throw("hello frappe from after_sbmit event")
	# def after_save(self):
	# 	frappe.throw("hello frappe from after_sava event")
	# def before_cancel(self):
    #  	frappe.throw("hello frappe from before_cancel event")
    # def before_delete(self):
    #     frappe.throw("from before delete event")
     
     
