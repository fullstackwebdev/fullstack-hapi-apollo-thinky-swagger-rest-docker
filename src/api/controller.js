

function dummyController(){}

dummyController.prototype.dummy = function(request, reply) {
    reply();
}

export default dummyController;