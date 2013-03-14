function Card (id, content) {
    var self = this;

    self.content = ko.observable(content || "");
    self.id = ko.observable(id);
    self.isEditing = ko.observable(false);

    self.isEditing.subscribe(function (newVal) {
        self.isEditingChanged(newVal, self);
    });

    self.edit = function () {
        self.isEditing(true);
    };                
}