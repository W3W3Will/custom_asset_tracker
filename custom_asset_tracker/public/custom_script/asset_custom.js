frappe.ui.form.on('Asset', {
    refresh: function(frm) {

        if (frm.doc.name) {
            // Generate QR code URL with asset ID
            let qr_code_url = `https://quickchart.io/qr?text=${encodeURIComponent(frm.doc.name)}`;

            // Create a download link for the QR code
            let download_link = `<a href="${qr_code_url}" download="Asset_${frm.doc.name}_QRCode.png">Download QR Code</a>`;

            // Set the custom HTML field with the QR code image and download link
            frm.set_df_property('custom_asset_qrcode', 'options', 
                `<img src="${qr_code_url}" alt="QR Code" style="max-width: 150px; max-height: 150px;">` +
                `<br>${download_link}`
            );
        }
    }
});