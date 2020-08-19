export default class AppointmentInfo {
	constructor(obj) {
		this.meetingRoom = {
			meetingRoomID: obj.meetingRoomID || null,
			meetingRoomNumber: obj.meetingRoomNumber || null,
			meetingRoomFloor: obj.meetingRoomFloor || null,
			meetingRoomLocation: obj.meetingRoomLocation || null,
			meetingRoomSize: obj.meetingRoomSize || null,
			meetingRoomVolume: obj.meetingRoomVolume || null,
		}
		this.subscriber = {
			email: obj.subscriber.email || null,
			userid: obj.subscriber.userid || null,
			photo: obj.subscriber.photo || null,
			department: obj.subscriber.department || null,
			level: obj.subscriber.level || null,
		}
		this.createdBy = {
			email: obj.createdBy.email || null,
			userid: obj.createdBy.userid || null,
			photo: obj.createdBy.photo || null,
			department: obj.createdBy.department || null,
			level: obj.createdBy.level || null,
		}
		this.createdDate = obj.createdDate
		this.content = obj.content
		this.startTime = obj.startTime
		this.endTime = obj.endTime
        this.appointDate = obj.appointDate
        this.members = obj.members
        this.modifyBy = {
            email: obj.modifyBy.email || null,
			userid: obj.modifyBy.userid || null,
			photo: obj.modifyBy.photo || null,
			department: obj.modifyBy.department || null,
			level: obj.modifyBy.level || null,
        }
        this.modifyDate = obj.modifyDate;
	}
}