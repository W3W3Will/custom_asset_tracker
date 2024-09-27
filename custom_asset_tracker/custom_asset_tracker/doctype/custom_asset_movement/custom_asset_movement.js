// Copyright (c) 2024, - and contributors
// For license information, please see license.txt

frappe.ui.form.on("Custom Asset Movement", {
	asset(frm) {
		frappe.call({
			method : "custom_asset_tracker.custom_asset_tracker.doctype.custom_asset_movement.custom_asset_movement.auto_fill_cmovement",
			args : {
				"asset": frm.doc.asset
			},
			callback: function(r) {
                if (!r.exc) {
                    // Set values in the current form based on the returned data
                    frm.set_value('asset_name', r.message.asset_name);
                    frm.set_value('from_employee', r.message.from_employee);
                    frm.set_value('from_location', r.message.from_location);

                    // Refresh form fields after setting new values
                    frm.refresh_fields();
                }
            }
		});
	},

    purpose_of_transfer(frm) {
		let purpose = frm.doc.purpose_of_transfer;

        if(purpose == 'Employee Transfer'){
            frm.set_df_property('to_employee', 'hidden', 0)
            frm.set_df_property('to_location', 'hidden', 1)
        }
        else if(purpose == 'Location Transfer'){
            frm.set_df_property('to_location', 'hidden', 0)
            frm.set_df_property('to_employee', 'hidden', 1)
        }
	},
});
