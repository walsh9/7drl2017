export default {
  peachPowers: [{
    name: 'Penetrating Beam',
    description: "Your energy beam cuts through everything.",
    bestow(entity) {
      entity.penetratingBeam = true;
    }
  }, {
    name: 'Giga Wave',
    description: 'Unleash a devastating shockwave.',
    bestow(entity) {
      entity.gigaWave = true;
    }
  }], 
  melonPowers: [{
    name: 'More Power',
    description: 'Energy Boost',
    bestow(entity) {
      entity.maxEnergy += 10;
      entity.energy = entity.maxEnergy;
    }
  }, {
    name: 'More Life',
    description: 'Health Boost',
    bestow(entity) {
      entity.maxHealth += 20;
      entity.health = entity.maxHealth;
    }
  }]
}