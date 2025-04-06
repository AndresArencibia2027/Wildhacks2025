import React from 'react';
import { useLocation } from 'react-router-dom';
import TypewriterHTML from '../components/TypewriterHTML';

const Logs = () => {
  const location = useLocation();
  const data = location.state || {};

  // Define your default HTML content.
  // Note: Ensure this string contains your full markup.
  const defaultHTMLContent = `<h2>Video analysis - 4/6/2025 11:58 AM</h2>
          <h3></h3>
          <p><strong>Frames per second:</strong> 24</p>
          <p><strong>Frames:</strong> 365</p>
          <p><strong>Number of noteworthy frames:</strong> 16</p>
          <p>
            Several frames from the video were extracted to assess the hive’s interior and the bees’ activity over time.
            This approach helps in evaluating both the structure of the comb and the behavior of the bees.
          </p>

          <h2>Hive State</h2>
          <ul>
            <li>
              <strong>Active and Intact Structure:</strong> The comb is clearly visible and appears to be in good condition, with uniform hexagonal cells that suggest the hive is well maintained.
            </li>
            <li>
              <strong>Dynamic Activity:</strong> Continuous movement of bees indicates that the colony is healthy, with bees actively entering and exiting cells.
            </li>
          </ul>

          <h2>Appearance and Behavior of the Bees</h2>
          <ul>
            <li>
              <strong>Typical Healthy Appearance:</strong> The bees exhibit a robust, fuzzy look with the usual dark and lighter areas expected in a thriving colony.
            </li>
            <li>
              <strong>Normal Movement Patterns:</strong> Observations show bees clustering around brood areas and foraging, indicating normal task execution and no signs of stress.
            </li>
          </ul>

          <h2>Notable Observations</h2>
          <ul>
            <li>
              <strong>No Visible Signs of Disease or Stress:</strong> There are no abnormal clusters, discoloration, or lethargy among the bees. The comb and bees appear free of pest infestation or structural damage.
            </li>
            <li>
              <strong>Environmental Conditions:</strong> Good lighting and visual clarity provide a detailed view of the hive’s interior, suggesting a healthy colony environment.
            </li>
            <li>
              <strong>Behavioral Insights:</strong> The natural flow of bees and the orderly structure of the comb imply that the colony is stable and well-managed.
            </li>
          </ul>

          <h2>Summary</h2>
          <ul>
            <li><strong>State of the Hive:</strong> The hive appears in good condition with an intact, well-organized comb and active bee traffic.</li>
            <li><strong>Bee Appearance:</strong> The bees look healthy with normal movement and coloration.</li>
            <li><strong>Key Takeaways:</strong> No alarming signs were observed; the video snapshot suggests a thriving, well-managed colony. However, continued observation is recommended.</li>
          </ul>
          <h2>Suggested action items</h2>
          <div className="category">
            <h3>Immediate Actions (Proceed with Caution - Wear Full Protective Gear)</h3>
            <div className="action-item">
              <input type="checkbox" id="observe_distance" />
              <label htmlFor="observe_distance">Observe from a Distance (note time, weather, unusual activity)</label>
              <ul style={{ listStyleType: 'disc', marginLeft: '40px' }}>
                <li><label htmlFor="observe_time">Note the time of day.</label></li>
                <li><label htmlFor="observe_weather">Note the weather conditions.</label></li>
                <li><label htmlFor="observe_activity">Note any unusual activity around the entrance.</label></li>
              </ul>
            </div>
            <div className="action-item">
              <input type="checkbox" id="gentle_approach" />
              <label htmlFor="gentle_approach">Gentle Approach (move slowly and deliberately)</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="light_smoke" />
              <label htmlFor="light_smoke">Smoke Them Lightly (few puffs at entrance and under lid)</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="check_external" />
              <label htmlFor="check_external">Check for Obvious External Disturbances:</label>
              <ul style={{ listStyleType: 'disc', marginLeft: '40px' }}>
                <li><label htmlFor="bumped_hive">Has the hive been bumped or knocked?</label></li>
                <li><label htmlFor="vibrations">Are there strong vibrations nearby?</label></li>
                <li><label htmlFor="strong_odors">Are there strong odors nearby?</label></li>
                <li><label htmlFor="animals">Are animals bothering the hive?</label></li>
              </ul>
            </div>
          </div>

          <div className="category">
            <h3>Internal Hive Inspection (If Necessary and Weather Permitting)</h3>
            <div className="action-item">
              <input type="checkbox" id="weather_check_inspect" />
              <label htmlFor="weather_check_inspect">Weather Check (warm, calm, sunny day)</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="gentle_opening_inspect" />
              <label htmlFor="gentle_opening_inspect">Gentle Opening (remove lid slowly, use smoker)</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="assess_food" />
              <label htmlFor="assess_food">Assess Food Stores (honey and pollen)</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="look_for_queen" />
              <label htmlFor="look_for_queen">Look for the Queen (or eggs/young larvae)</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="check_brood" />
              <label htmlFor="check_brood">Check for Brood Issues (healthy pattern)</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="assess_space" />
              <label htmlFor="assess_space">Assess Space (overcrowding?)</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="check_pests_diseases" />
              <label htmlFor="check_pests_diseases">Check for Pests and Diseases (mites, beetles, moths, foulbrood)</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="avoid_crushing" />
              <label htmlFor="avoid_crushing">Avoid Crushing Bees (releases alarm pheromones)</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="brief_inspection" />
              <label htmlFor="brief_inspection">Keep Inspections Brief</label>
            </div>
          </div>

          <div className="category">
            <h3>Environmental Factors</h3>
            <div className="action-item">
              <input type="checkbox" id="water_source" />
              <label htmlFor="water_source">Water Source (ensure clean and reliable)</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="forage_availability" />
              <label htmlFor="forage_availability">Forage Availability (nectar and pollen sources)</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="hive_location" />
              <label htmlFor="hive_location">Hive Location (sun, wind exposure)</label>
            </div>
          </div>

          <div className="category">
            <h3>Other Considerations</h3>
            <div className="action-item">
              <input type="checkbox" id="recent_manipulation" />
              <label htmlFor="recent_manipulation">Recent Manipulation (bees can be agitated after)</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="robbing_behavior" />
              <label htmlFor="robbing_behavior">Robbing Behavior (reduce entrance size)</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="queen_issues" />
              <label htmlFor="queen_issues">Queen Issues (old, failing, recently replaced)</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="genetics" />
              <label htmlFor="genetics">Genetics (some strains are more defensive)</label>
            </div>
          </div>

          <div className="category">
            <h3>Troubleshooting Steps</h3>
            <div className="action-item">
              <input type="checkbox" id="observe_external_troubleshoot" />
              <label htmlFor="observe_external_troubleshoot">Start with external observation.</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="brief_internal_troubleshoot" />
              <label htmlFor="brief_internal_troubleshoot">If necessary, perform a brief internal inspection on a good day.</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="address_issues_troubleshoot" />
              <label htmlFor="address_issues_troubleshoot">Address any immediate issues found.</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="monitor_behavior_troubleshoot" />
              <label htmlFor="monitor_behavior_troubleshoot">Monitor the hive's behavior over the next few days.</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="seek_advice_troubleshoot" />
              <label htmlFor="seek_advice_troubleshoot">If the problem persists, consider more in-depth inspections or seeking advice.</label>
            </div>
          </div>

          <div className="category">
            <h3>Important Safety Reminders</h3>
            <div className="action-item">
              <input type="checkbox" id="full_gear_safety" />
              <label htmlFor="full_gear_safety">Wear Full Protective Gear.</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="escape_plan_safety" />
              <label htmlFor="escape_plan_safety">Have an Escape Plan.</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="allergy_plan_safety" />
              <label htmlFor="allergy_plan_safety">Have an Allergy Plan (if applicable).</label>
            </div>
            <div className="action-item">
              <input type="checkbox" id="know_limits_safety" />
              <label htmlFor="know_limits_safety">Know Your Limits and seek help if needed.</label>
            </div>
          </div>
          <h2></h2>
        </div>
  `;

  return (
    <div className="logs">
      <h2>Beehive Logs</h2>
      {data.report ? (
        <div>
          <TypewriterHTML html={data.report} speed={1} />
        </div>
      ) : (
        <div className="no-logs">
          <TypewriterHTML html={defaultHTMLContent} speed={1} />
        </div>
      )}
    </div>
  );
};

export default Logs;
