function (doc) {
	if (doc._id.substr(0, 8) === "workout:") {
		emit(doc._id, {
			"workout": doc.workout,
			"training": doc.training,
			"wname": doc.wname,
			"favorite": doc.favorite,
			"howlong": doc.howlong,
			"timeofday": doc.timeofday,
			"completiondate": doc.completiondate,
			"comments": doc.comments
		});
	}
};