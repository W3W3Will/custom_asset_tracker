# Copyright (c) 2024, - and contributors
# For license information, please see license.txt

import frappe
from datetime import datetime
from frappe.model.document import Document


class CustomAssetMovement(Document):
	def before_submit(self):
		CAsset = frappe.get_doc('Custom Asset', self.asset)
		# frappe.throw(self.to_employee)
		# frappe.throw(f"Custom Asset Details: Name={CAsset.name}, Current Holder={CAsset.current_holder}, Location={CAsset.location}")

		self.transfer_date = frappe.utils.now_datetime()	
		if self.to_employee:
			CAsset.current_holder = self.to_employee

		elif self.to_location:
			CAsset.location = self.to_location

		# self.save()
		CAsset.save()
	
	
	def validate(self):
		if self.from_employee == self.to_employee:
			frappe.throw("From Employee and To Employee can't be the same person")
		elif self.from_location == self.to_location:
			frappe.throw("From location and To Location can't be the same location")



@frappe.whitelist()
def auto_fill_cmovement(asset):
	CAsset = frappe.get_doc("Custom Asset", asset)

	return {
		"asset_name": CAsset.asset_name,
		"from_employee": CAsset.current_holder,
		"from_location": CAsset.location
	}
	

