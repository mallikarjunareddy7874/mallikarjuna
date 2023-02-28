// Copyright (c) 2023, mallikarjuna and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Test Report"] = {
	"filters": [
		{ 
			fieldname:"priority",
			label:__("Priority"),
			fieldtype: "Select",
			options:"\nHigh\nMedium\nLow"
		},
		{
			fieldname:"owner",
			label:__("Owner"),
			fieldtype: "Link",
			options:"User",
		},

	],
	}); 
	

};

