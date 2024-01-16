type PlayerPosition = "goalkeeper" | "defender" | "midfielder" | "forward";
type Level = 1 | 2 | 3 | 4 | 5;
type PositionLevel = 1 | 2 | 3 | 4;

interface Player {
  id: number;
  name: string;
  position: PlayerPosition;
  positionLevel: PositionLevel;
  level: Level;
}

const originalPlayers: Player[] = [
  {
    id: 1,
    name: "Lucas Alves",
    position: "goalkeeper",
    positionLevel: 1,
    level: 3,
  },
  { id: 2, name: "Samuel", position: "goalkeeper", positionLevel: 1, level: 3 },
  { id: 3, name: "Altair", position: "defender", positionLevel: 2, level: 3 },
  {
    id: 4,
    name: "Leo Hermann",
    position: "defender",
    positionLevel: 2,
    level: 3,
  },
  { id: 5, name: "Fábio", position: "defender", positionLevel: 2, level: 2 },
  { id: 6, name: "Matheus", position: "defender", positionLevel: 2, level: 2 },
  {
    id: 7,
    name: "Marcos Alves",
    position: "midfielder",
    positionLevel: 3,
    level: 4,
  },
  {
    id: 8,
    name: "Pretinho",
    position: "midfielder",
    positionLevel: 3,
    level: 4,
  },
  { id: 9, name: "Danilo", position: "midfielder", positionLevel: 3, level: 4 },
  {
    id: 10,
    name: "João Marcus",
    position: "midfielder",
    positionLevel: 3,
    level: 4,
  },
  {
    id: 11,
    name: "Lucas Soler",
    position: "forward",
    positionLevel: 4,
    level: 3,
  },
  { id: 12, name: "Victor", position: "forward", positionLevel: 4, level: 2 },
  { id: 13, name: "Rafael", position: "forward", positionLevel: 4, level: 2 },
  { id: 14, name: "Deivid", position: "forward", positionLevel: 4, level: 3 },
];

class PlayerDraw {
  private players: Player[];
  private teamA: Player[] = [];
  private teamB: Player[] = [];

  constructor(players: Player[]) {
    this.players = players;
  }

  public getTeamA() {
    return this.teamA;
  }

  public getTeamB() {
    return this.teamB;
  }

  public drawTeams() {
    this.drawGoalkeepers();
    this.drawDefenders();
    this.drawMidfielders();
    this.drawForwards();
  }

  private drawGoalkeepers() {
    const goalKeepers = this.getGoalkeepers();
    this.drawRandomlyPlayersByPosition(goalKeepers);
  }

  private drawDefenders() {
    const defenders = this.getDefenders();
    this.drawRandomlyPlayersByPosition(defenders);
  }

  private drawMidfielders() {
    const midfielder = this.getMidfielders();
    this.drawRandomlyPlayersByPosition(midfielder);
  }

  private drawForwards() {
    const forwards = this.getForwards();
    this.drawRandomlyPlayersByPosition(forwards);
  }

  private drawRandomlyPlayersByPosition(playersAtAPosition: Player[]) {
    const playersAtAPositionByTeam = playersAtAPosition.length / 2;
    playersAtAPosition.sort(this.randomSort);

    this.teamA.push(...playersAtAPosition.splice(0, playersAtAPositionByTeam));
    this.teamB.push(...playersAtAPosition);
  }

  private randomSort() {
    return Math.random() - 0.5;
  }

  private getGoalkeepers(): Player[] {
    return this.getPlayersByPosition("goalkeeper");
  }

  private getDefenders(): Player[] {
    return this.getPlayersByPosition("defender");
  }

  private getMidfielders(): Player[] {
    return this.getPlayersByPosition("midfielder");
  }

  private getForwards(): Player[] {
    return this.getPlayersByPosition("forward");
  }

  private getPlayersByPosition(position: PlayerPosition): Player[] {
    const playersAtPosition = this.players.filter(
      (player) => player.position === position
    );

    if (playersAtPosition.length === 0)
      throw new Error(`No players at the position '${position}' found`);

    return playersAtPosition;
  }
}

export { PlayerDraw, originalPlayers };

export type { Level, Player, PlayerPosition, PositionLevel };
