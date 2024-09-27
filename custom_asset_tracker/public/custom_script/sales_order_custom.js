frappe.ui.form.on('Sales Order', {
    refresh(frm) { 
        frm.set_df_property('delivery_date', 'hidden', 1);
    }
});