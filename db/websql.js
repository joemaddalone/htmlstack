'use strict';

/*
 * persistant editable HTML5 Database example
 * http://htmlstack.com/
 *
 * Author, Joe Maddalone
 */
var contacts = function contacts(dbName, dbVersion, dbDisplay, dbSize) {
    this.db = openDatabase(dbName, dbVersion, dbDisplay, dbSize);
};
contacts.prototype = {
    get: function get() {
        this.db.transaction(function (sql) {
            sql.executeSql('CREATE TABLE IF NOT EXISTS ContactTbl(id INTEGER PRIMARY KEY,fname TEXT,lname TEXT, email TEXT)', []);
            sql.executeSql('SELECT * FROM ContactTbl order by lname', [], function (sql, rs) {
                var results = $("results");
                results.innerHTML = '';
                for (var i = 0; i < rs.rows.length; i++) {
                    var row = rs.rows.item(i);
                    var rec = ce('div', row['id'] + '.rec', row['fname'] + ' ' + row['lname']);
                    results.appendChild(rec);
                    rec.addEventListener('click', function (rec) {
                        db.show(this.id);
                    }, false);
                }
            });
        });
    },
    show: function show(cid) {
        this.db.transaction(function (tx) {
            tx.executeSql('SELECT * FROM ContactTbl where id=?', [cid.replace('.rec', '')], function (tx, rs) {
                var info = $("info");
                info.innerHTML = '';
                var row = rs.rows.item(0);
                info.appendChild(ce('label', 'flbl', 'First Name'));
                info.appendChild(ce('text', 'fname', row['fname'], true));
                info.appendChild(ce('label', 'llbl', 'Last Name'));
                info.appendChild(ce('text', 'lname', row['lname'], true));
                info.appendChild(ce('label', 'elbl', 'Email'));
                info.appendChild(ce('text', 'email', row['email'], true));
                info.appendChild(ce('button', 'update', 'Update'));
                info.appendChild(ce('button', 'delete', 'Delete'));
                info.appendChild(ce('button', 'cancel', 'Cancel'));
                $('update').addEventListener('click', function (e) {
                    db.update(cid);
                }, false);
                $('delete').addEventListener('click', function (e) {
                    db.del(cid);
                }, false);
                $('cancel').addEventListener('click', function (e) {
                    db.showEmpty();
                }, false);
            });
            $('editTitle').innerHTML = 'Edit Contact';
        });
    },
    add: function add() {
        var fname = $("fname").value;
        var lname = $("lname").value;
        var email = $("email").value;
        this.db.transaction(function (tx) {
            tx.executeSql("INSERT INTO ContactTbl (fname,lname,email) VALUES (?, ?, ?)", [fname, lname, email]);
        });
        this.get();
        this.showEmpty();
    },
    del: function del(cid) {
        this.db.transaction(function (tx) {
            tx.executeSql("DELETE from ContactTbl WHERE id=" + cid.replace('.rec', ''));
        });
        this.get();
        this.showEmpty();
    },
    update: function update(cid) {

        this.add();
        this.del(cid); //yes I am THAT lazy!!!
    },
    showEmpty: function showEmpty() {
        var info = $("info");
        info.innerHTML = '';
        info.appendChild(ce('label', 'flbl', 'First Name'));
        info.appendChild(ce('text', 'fname', '', true));
        info.appendChild(ce('label', 'llbl', 'Last Name'));
        info.appendChild(ce('text', 'lname', '', true));
        info.appendChild(ce('label', 'elbl', 'Email'));
        info.appendChild(ce('text', 'email', '', true));
        info.appendChild(ce('button', 'add', 'Add'));
        $('add').addEventListener('click', function (e) {
            db.add();
        }, false);
        $('editTitle').innerHTML = 'Add New';
    }

};

function ce(type, ident, inner, isInput) {
    var el;
    if (!isInput) {
        el = document.createElement(type);
        el.innerHTML = inner;
    } else {
        el = document.createElement('input');
        el.value = inner;
        el.type = type;
    }
    el.id = ident;
    return el;
}
function $(selector) {
    return document.getElementById(selector);
}

var db = new contacts("HTMLDB", "1.0", "TestDB", 1048576);
db.get();
db.showEmpty();