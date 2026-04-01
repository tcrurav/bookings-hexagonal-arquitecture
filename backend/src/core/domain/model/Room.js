export class Room {
  constructor({ id, name, capacity, active = true }) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.active = active;
  }
}
