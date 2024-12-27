// models/Nudge.js

export class Nudge {
    constructor(title, image, scheduledDate, timing, description, sendTime, icon = null) {
        this.title = title;  // 60 characters max
        this.image = image;  // Image ID from GridFS (MongoDB)
        this.scheduledDate = scheduledDate;  // Date (dd/mm/yy format)
        this.timing = timing;  // {from: hh:mm, to: hh:mm}
        this.description = description;  // Text description of the nudge
        this.sendTime = sendTime;  // The time when the nudge will be sent
        this.icon = icon;  // Optional icon for the nudge
    }
}
