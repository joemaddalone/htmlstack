
/*
 * persistant editable HTML5 Database example
 * http://www.htmlstack.com/
 *
 * Author, Joe Maddalone
*/

var contacts = 
	function (dbName, dbVersion, dbDisplay, dbSize) {
	this.db = openDatabase(dbName, dbVersion, dbDisplay, dbSize);this.cid=0
	}

contacts.prototype = {
	get: function()
		{
			/*
			$("#fname").val('')
			$("#lname").val('')
			$("#email").val('')
			$("#newFname").val('')
			$("#newLname").val('')
			$("#newEmail").val('')		
			*/
			this.db.transaction(function (sql) 
				{
				sql.executeSql('CREATE TABLE IF NOT EXISTS ContactTbl(id INTEGER PRIMARY KEY,fname TEXT,lname TEXT, email TEXT)', []);
				sql.executeSql('SELECT * FROM ContactTbl order by lname', [], function (sql, rs) 
					{
					$("#contacts").html('');
					for (var i = 0; i < rs.rows.length; i++) {
						var row = rs.rows.item(i);
						$('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li ui-btn-up-c">' + 
						'<div class="ui-btn-inner ui-li"><div class="ui-btn-text"><a onclick="db.show(' + row['id'] + 	')" href="#two" class="ui-link-inherit">' + parseInt(i+1) + '. ' +  row['fname'] + ' ' + 	row['lname'] + '</a>' +
						'</div><span class="ui-icon ui-icon-arrow-r"></span></div></li>').appendTo($('#contacts'));	
						//$('#' + row['id']).click(function (e) {alert('clicked!');window.cid=row['id']}, false);
					}
				});
			});
	},
	show: function(cid)
		{
			console.log('called show on '  +   cid + '!')
			$('#delBtn').unbind().click(function (e) {db.del(cid)});
			$('#updateBtn').unbind().click(function (e) {db.update(cid)});
			this.db.transaction(function (tx)
				{
					tx.executeSql('SELECT * FROM ContactTbl where id=?', [cid], function (tx, rs) {
					var row = rs.rows.item(0);
					$("#fname").val(row['fname'])
					$("#lname").val(row['lname'])
					$("#email").val(row['email'])
				});
			});		
	},
	add: function()
		{
			var nfname = $("#newFname").val()
			var nlname = $("#newLname").val()
			var nemail = $("#newEmail").val()
			this.db.transaction(
			function (tx) {
				tx.executeSql("INSERT INTO ContactTbl (fname,lname,email) VALUES (?, ?, ?)", [nfname, nlname, nemail])
			});
			db.get()
	},
	del: function(cid)
		{
			this.db.transaction(
				function (tx) {
					tx.executeSql("DELETE from ContactTbl WHERE id=" + cid);
			});
		db.get()
	},
	update: function (cid)
		{
			console.log('called update on '  +   cid + '!')
			var ufname = $("#fname").val()
			var ulname = $("#lname").val()
			var uemail = $("#email").val()
			console.log(ufname + '---' + ulname)
			this.db.transaction(function (tx) {tx.executeSql("UPDATE ContactTbl SET fname = ?, lname = ?, email = ? WHERE id = ?",[ufname, ulname, uemail, cid]);
			});	
			db.get()
	}
}
$('#addBtn').click(function (e) {db.add()});
