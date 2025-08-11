const PlantCareTips = () => {
  const tips = [
    {
      title: "💧 Watering",
      description:
        "Water your plants regularly, but avoid overwatering. Always check the top inch of soil—if it’s dry, it’s time to water.",
    },
    {
      title: "☀️ Sunlight",
      description:
        "Place plants in appropriate lighting conditions. Indoor plants often prefer indirect sunlight, while outdoor plants may thrive in full sun.",
    },
    {
      title: "🌱 Soil Quality",
      description:
        "Use well-draining soil suited to the plant type. Consider adding compost or organic matter to improve soil health.",
    },
    {
      title: "🌬️ Air Circulation",
      description:
        "Good airflow prevents fungal infections and pests. Avoid placing plants too close together in enclosed areas.",
    },
    {
      title: "🪴 Repotting",
      description:
        "Repot plants every 1–2 years to refresh soil and allow room for root growth. Choose a pot slightly larger than the current one.",
    },
    {
      title: "🐛 Pest Control",
      description:
        "Inspect plants regularly for pests like aphids or spider mites. Treat early using natural solutions or mild insecticides.",
    },
  ];

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-green-800 mb-4">
        🌿 Plant Care Tips
      </h1>
      <p className="text-lg text-center max-w-2xl mx-auto mb-8">
        Whether you're new to gardening or an experienced plant parent, these
        essential tips will help keep your plants healthy and thriving.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              {tip.title}
            </h3>
            <p className="text-gray-600">{tip.description}</p>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-12 p-6 bg-green-100 rounded-lg shadow-inner text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          Did You Know?
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Healthy plants not only beautify your space but also purify the air
          and improve your overall well-being. Taking small steps in plant care
          can lead to big rewards for you and your green friends!
        </p>
      </div>
    </div>
  );
};

export default PlantCareTips;
