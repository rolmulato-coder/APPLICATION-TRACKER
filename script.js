*{box-sizing:border-box}
body{font-family:Inter,system-ui,Roboto,Arial,sans-serif;margin:0;background:#f3f4f6;color:#111}
.site-header{background:#111827;color:#fff;padding:18px;text-align:center}
.container{max-width:1100px;margin:20px auto;display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:0 16px}
.card{background:#fff;padding:16px;border-radius:10px;box-shadow:0 8px 28px rgba(15,23,42,0.06)}
label{display:block;margin-bottom:8px;font-size:0.95rem}
input[type="text"],input[type="date"],select,input{width:100%;padding:8px;border-radius:6px;border:1px solid #e6e7eb;margin-top:6px}
.btn-row{display:flex;gap:8px;margin-top:8px}
button{padding:8px 12px;border-radius:8px;border:none;background:#2563eb;color:#fff;cursor:pointer}
button[type="button"]{background:#6b7280}
.controls{display:flex;gap:8px;margin-bottom:10px}
.controls input{flex:1;padding:8px;border-radius:6px;border:1px solid #e6e7eb}
table{width:100%;border-collapse:collapse}
th,td{padding:8px;border-bottom:1px solid #f1f5f9;text-align:left;font-size:0.9rem}
.actions-btn{padding:6px 8px;border-radius:6px;border:none;cursor:pointer;margin-right:6px}
.btn-edit{background:#f59e0b;color:#fff}
.btn-delete{background:#ef4444;color:#fff}
@media(max-width:900px){.container{grid-template-columns:1fr}}
