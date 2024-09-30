import frappe

@frappe.whitelist()
def get_assets():
    all_asset = frappe.get_all("Custom Asset")
    return all_asset



@frappe.whitelist()
def get_specific_asset(asset_name):
    specific_asset = frappe.get_doc("Custom Asset", asset_name)
    return specific_asset

@frappe.whitelist()
def get_specific_asset_movements(asset_name):
    list_of_movement = frappe.db.get_list("Custom Asset Movement",
        filters={
            "asset": asset_name
        },
        fields=[
            "name", 
            "asset", 
            "asset_name", 
            "purpose_of_transfer", 
            "from_employee", 
            "to_employee",
            "from_location",
            "to_location",
            "transfer_date"]
    )

    return list_of_movement