
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useApp } from '@/contexts/AppContext';
import type { EventsMapProps } from './types';

const DEFAULT_REGION = {
  latitude: -23.62,
  longitude: -45.41,
  latitudeDelta: 0.35,
  longitudeDelta: 0.35,
};

const MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#edf0ed' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#68736d' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#edf0ed' }] },
  { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#dce8dc' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#dce2dc' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#d5e5e8' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
];

function EventMarker({
  selected,
  color,
}: {
  selected: boolean;
  color: string;
}) {
  return (
    <View collapsable={false} style={styles.markerContainer}>
      <View
        style={[
          styles.marker,
          { backgroundColor: color },
          selected && styles.selectedMarker,
        ]}
      >
        <View style={styles.markerInner}>
          <View style={styles.markerDot} />
        </View>
      </View>
      <View
        style={[
          styles.markerTail,
          { backgroundColor: color },
        ]}
      />
    </View>
  );
}

export default function EventsMap({
  pins,
  selectedId,
  onSelect,
}: EventsMapProps) {
  const { theme } = useApp();
  const mapRef = useRef<MapView | null>(null);
  const [ready, setReady] = useState(false);
  const pinsKey = pins.map((pin) => pin.id).join(',');

  useEffect(() => {
    if (!ready || pins.length === 0) return;

    if (pins.length === 1) {
      mapRef.current?.animateToRegion(
        {
          latitude: pins[0].latitude,
          longitude: pins[0].longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        },
        400
      );
      return;
    }

    mapRef.current?.fitToCoordinates(
      pins.map((pin) => ({
        latitude: pin.latitude,
        longitude: pin.longitude,
      })),
      {
        edgePadding: {
          top: 90,
          right: 60,
          bottom: 90,
          left: 60,
        },
        animated: true,
      }
    );
  }, [ready, pinsKey]);

  useEffect(() => {
    const pin = pins.find((item) => item.id === selectedId);

    if (!ready || !pin) return;

    mapRef.current?.animateToRegion(
      {
        latitude: pin.latitude,
        longitude: pin.longitude,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025,
      },
      400
    );
  }, [selectedId, ready]);

  return (
    <MapView
      ref={mapRef}
      style={StyleSheet.absoluteFill}
      initialRegion={DEFAULT_REGION}
      customMapStyle={MAP_STYLE}
      onMapReady={() => setReady(true)}
      showsCompass={false}
      showsPointsOfInterest={false}
      toolbarEnabled={false}
      loadingEnabled
      moveOnMarkerPress={false}
    >
      {pins.map((pin) => {
        const selected = pin.id === selectedId;

        return (
          <Marker
            key={`${pin.id}-${selected}`}
            coordinate={{
              latitude: pin.latitude,
              longitude: pin.longitude,
            }}
            anchor={{ x: 0.5, y: 1 }}
            title={pin.title}
            description={`${pin.place}, ${pin.city}`}
            onPress={() => onSelect(pin.id)}
          >
            <EventMarker
              selected={selected}
              color={selected ? theme.secondary : theme.primary}
            />
          </Marker>
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    width: 46,
    height: 54,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    zIndex: 2,
  },
  selectedMarker: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 4,
  },
  markerInner: {
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  markerTail: {
    position: 'absolute',
    top: 31,
    width: 13,
    height: 13,
    transform: [{ rotate: '45deg' }],
    borderBottomRightRadius: 3,
    zIndex: 1,
  },
});
