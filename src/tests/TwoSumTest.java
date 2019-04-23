package tests;

import java.io.IOException;
import java.util.ArrayList;

import org.json.*;

import utils.LeetUtil;

public class TwoSumTest {
	
	
	public static void main(String[] args) throws IOException {
		new TwoSumTest();
	}
	
	public TwoSumTest() throws IOException {
		ArrayList<JSONObject> jsonarray = LeetUtil.loadData("two-sum");
		jsonarray.forEach(it -> assertOne(it));
		System.out.println("all pass!");
	}

	void assertOne(JSONObject obj) {
		JSONArray params = obj.getJSONArray("params");
		JSONArray result = obj.getJSONArray("result");

		int[] param0 = LeetUtil.Json2intArray(params.getJSONArray(0));
		int param1 = params.getInt(1);

		Solution sln = new Solution();
		int[] slnRtn = sln.twoSum(param0, param1);

		int[] expectedRtn = LeetUtil.Json2intArray(result);

		boolean match = LeetUtil.equalWithoutOrder(slnRtn, expectedRtn);

		if (!match) {
			String input = LeetUtil.toJson(param0) + "," + param1;
			String output = LeetUtil.toJson(slnRtn);
			String expected = LeetUtil.toJson(expectedRtn);
			System.err.print("Input:" + input + " \nOutput:" + output + " \nExpect:" + expected);
			System.exit(1);
		}
	}
	
	// LEETCODE_MVP_ANSWER

	class Solution {
		public int[] twoSum(int[] nums, int target) {
			for (int i = 0; i < nums.length; i++) {
				for (int j = i + 1; j < nums.length; j++) {
					if (nums[i] + nums[j] == target) {
						return new int[] { i, j };
					}
				}
			}
			return new int[] {};
		}
	}
}